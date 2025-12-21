import { cookies } from "next/headers";
import { adminAuth, adminFirestore } from "./firestore/firebaseAdmin";

export async function getUserServer() {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) return null;

    try {
        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        return decoded;
    } catch (e) {
        return null;
    }
}

export async function requireUser() {
    const user = await getUserServer();

    if (!user) return null;

    return user;
}

const getOrderedCollection = async (userId?: string | null, collection?: string) => {
    if (!userId || !collection) return null;

    try {
        const snapshot = await adminFirestore
            .collection("users")
            .doc(userId)
            .collection(collection)
            .orderBy("createdAt", "desc")
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (e) {
        console.error(`Error fetching ${collection}:`, e);
        return null;
    }
};

export async function getStoriesServer(user_id?: string | null) {
    return getOrderedCollection(user_id, "stories");
}

export async function getVideosServer(user_id?: string | null) {
    return getOrderedCollection(user_id, "videos");
}

export async function getColoringPagesServer(user_id?: string | null) {
    return getOrderedCollection(user_id, "coloringPages");
}
