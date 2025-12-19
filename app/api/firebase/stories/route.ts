import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const idToken = authHeader.substring(7); // Remove "Bearer "

        // Verify the token
        const decoded = await adminAuth.verifyIdToken(idToken);
        const uid = decoded.uid;

        // Fetch stories from Firestore
        const storiesRef = adminFirestore.collection("users").doc(uid).collection("stories");
        const snapshot = await storiesRef.orderBy("createdAt", "desc").get();

        const stories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({ stories }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching stories:", error);
        return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
    }
}