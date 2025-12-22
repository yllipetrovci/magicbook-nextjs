import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";
import admin from "firebase-admin";
import { REFERRAL_BONUS_CREDITS } from "@/lib/constants/referral";

const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
const increment = admin.firestore.FieldValue.increment;

export async function POST(req: Request) {
  const { email, password, ref } = await req.json();

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

    const normalizedRef = typeof ref === "string" ? ref.trim() : "";
    const isReferralValid =
      normalizedRef.length > 0 &&
      normalizedRef !== userRecord.uid &&
      (await adminFirestore.collection("users").doc(normalizedRef).get()).exists;
    const referralBonus = isReferralValid ? REFERRAL_BONUS_CREDITS : 0;

    await adminFirestore.collection("users").doc(userRecord.uid).set({
      email,
      credits: referralBonus,
      plan: "free",
      referredBy: isReferralValid ? normalizedRef : null,
      referralBonusApplied: referralBonus > 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    if (isReferralValid) {
      await adminFirestore.collection("users").doc(normalizedRef).update({
        credits: increment(REFERRAL_BONUS_CREDITS),
        updatedAt: serverTimestamp(),
      });
    }

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
