import { cookies } from "next/headers";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";

export async function getUserServer() {
    const session = (await cookies()).get("session")?.value;

    if (!session) return null;

    try {
        // Verify session cookie
        const decoded = await adminAuth.verifySessionCookie(session, true);

        // Get Firestore user profile
        const profileSnap = await adminFirestore
            .collection("users")
            .doc(decoded.uid)
            .get();

        const profile = profileSnap.exists ? profileSnap.data() : {};

        return {
            uid: decoded.uid,
            email: decoded.email || null,
            ...profile,         // coins, plan, createdAt, etc.
        };
    } catch (error) {
        return null;
    }
}
