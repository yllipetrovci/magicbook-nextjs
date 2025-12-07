import { NextResponse } from "next/server";
import { auth, firestore } from "@/lib/firestore/firebaseAdmin";

export async function POST(request: Request) {
    try {
        const { idToken, data } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
        }

        // Verify the ID token
        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email;

        // Create or update the user document in Firestore
        await firestore.collection("users").doc(uid).set({
            uid,
            email,
            createdAt: new Date().toISOString(),
            ...data, // Merge any additional data passed
        }, { merge: true });

        return NextResponse.json({
            success: true,
            message: "User record created/updated successfully",
            uid
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error creating user record:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
