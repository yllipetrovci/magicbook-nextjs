import { adminFirestore } from "@/lib/firestore/firebaseAdmin";
import { sanitizeFirestore } from "./sanitizeFirestore";
import { serverTimestamp } from "firebase/firestore";

export interface CreateVideoInput {
    taskId: string;
    thumbnail?: string | null;
    prompt?: string;
    style?: string;
    status?: string;
    videoUrl?: string | null;
}

export async function createUserVideo(
    uid: string,
    videoData: CreateVideoInput
) {
    try {
        const videoRef = adminFirestore
            .collection("users")
            .doc(uid)
            .collection("videos")
            .doc(); // auto generate ID

        const payload = {
            ...videoData,
            videoId: videoRef.id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        await videoRef.set(payload);

        return {
            success: true,
            videoId: videoRef.id,
            data: payload,
        };
    } catch (err: any) {
        console.error("🔥 Error creating user video:", err);
        return {
            success: false,
            error: err.message,
        };
    }
}

export async function getUserVideos(
    uid: string,
    cursor?: FirebaseFirestore.DocumentSnapshot
) {
    let query = adminFirestore
        .collection("users")
        .doc(uid)
        .collection("videos")
        .orderBy("createdAt", "desc")
        .limit(10);

    // 👉 Apply cursor if it exists
    if (cursor) {
        query = query.startAfter(cursor);
    }

    const snap = await query.get();

    const videos = snap.docs.map(doc => ({
        id: doc.id,
        ...sanitizeFirestore(doc.data())
    }));

    // 👉 New cursor is the last doc of the current batch
    const nextCursor = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

    return {
        videos,
        nextCursor,
    };
}


/**
 * Update the status of a user's video
 *
 * @param uid - Firebase Auth user ID
 * @param videoId - Document ID of the video inside /users/{uid}/videos/
 * @param status - New status string (e.g., "processing", "done", "failed")
 */
//example to use await updateUserVideoStatus(uid, videoId, "failed");
export async function updateUserVideoStatus(
    uid: string,
    videoId: string,
    status: string
) {
    const ref = adminFirestore
        .collection("users")
        .doc(uid)
        .collection("videos")
        .doc(videoId);

    await ref.update({
        status,
        updatedAt: new Date(),
    });

    return { success: true };
}
