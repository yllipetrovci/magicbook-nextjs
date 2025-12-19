import { cookies } from "next/headers";
import { adminAuth, adminFirestore } from "./firestore/firebaseAdmin";

export async function getUserServer() {
    const sessionCookie = (await cookies()).get("session")?.value;
    console.log({ sessionCookie });
    if (!sessionCookie) return null;

    try {
        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        console.log({ decoded });
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

export async function getStoriesServer(user_id:string) {
    if (!user_id) return null;

    try {
        const storiesRef = adminFirestore.collection("users").doc(user_id).collection("stories");
        const snapshot = await storiesRef.orderBy("createdAt", "desc").get();

        const stories = snapshot.docs.map(doc => doc.data());

        return stories;
    } catch (e) {
        console.error("Error fetching stories:", e);
        return null;
    }
}