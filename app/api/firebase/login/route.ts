import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firestore/firebaseAdmin";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    try {
        // Firebase REST auth API
        const loginResponse = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            process.env.PRIVATE_FIREBASE_API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, returnSecureToken: true }),
            }
        ).then((r) => r.json());

        console.log(loginResponse);
        if (loginResponse.error) {
            return NextResponse.json(loginResponse.error, { status: 401 });
        }

        const idToken = loginResponse.idToken;
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn,
        });

        const res = NextResponse.json({ status: "signed_in" });

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
    } catch (err) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
