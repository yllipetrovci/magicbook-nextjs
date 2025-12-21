import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";

export async function GET(req: NextRequest) {
    const nullUserResponse = (status: number) => NextResponse.json({ user: null }, { status });

    try {
        // Get the session cookie
        const sessionCookie = req.cookies.get("session")?.value;

        if (!sessionCookie) {
            return nullUserResponse(401);
        }

        // Verify the session cookie
        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        const uid = decoded.uid;

        // Get user data from Firestore
        const userDoc = await adminFirestore.collection("users").doc(uid).get();

        if (!userDoc.exists) {
            return nullUserResponse(404);
        }

        const userData = userDoc.data();

        // Return user data including credits
        return NextResponse.json({
            uid: userData?.uid || uid,
            email: userData?.email || decoded.email,
            credits: userData?.credits || 0,
            plan: userData?.plan || "free",
            // Add other user fields as needed
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching user data:", error);
        const isAuthError = typeof error?.code === "string" && error.code.startsWith("auth/");
        return nullUserResponse(isAuthError ? 401 : 500);
    }
}
