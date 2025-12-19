import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";

export async function GET(req: NextRequest) {
    try {
        // Get the session cookie
        const sessionCookie = req.cookies.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify the session cookie
        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        const uid = decoded.uid;

        // Get user data from Firestore
        const userDoc = await adminFirestore.collection("users").doc(uid).get();

        if (!userDoc.exists) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
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
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}