import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firestore/firebaseAdmin";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    /**
     * 1️⃣ Create user using Firebase Admin SDK
     */
    const userRecord = await adminAuth.createUser({
      email,
      password,
      emailVerified: false,
    });

    /**
     * 2️⃣ Sign in user via Firebase REST API
     * (needed to obtain idToken)
     */
    const signInResponse = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        process.env.PRIVATE_FIREBASE_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    ).then((r) => r.json());

    if (signInResponse.error) {
      return NextResponse.json(signInResponse.error, { status: 401 });
    }

    const idToken = signInResponse.idToken;

    /**
     * 3️⃣ Create session cookie
     */
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    /**
     * 4️⃣ Set cookie
     */
    const res = NextResponse.json({
      status: "signed_up",
      uid: userRecord.uid,
    });

    res.cookies.set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return res;
  } catch (error: any) {
    // Handle Firebase duplicate email error
    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
