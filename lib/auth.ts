import { cookies } from "next/headers";
import { adminAuth } from "./firestore/firebaseAdmin";

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
