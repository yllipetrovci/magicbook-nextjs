// // /app/api/klingai/get-videos/route.ts
// import { NextResponse } from "next/server";
// import { generateKlingToken } from "@/lib/klingaiAuth";

// export async function POST(req: Request) {
//     try {
//         const { taskIds } = await req.json();

//         if (!Array.isArray(taskIds) || taskIds.length === 0) {
//             return NextResponse.json(
//                 { error: "taskIds[] required" },
//                 { status: 400 }
//             );
//         }

//         const apiToken = generateKlingToken();
//         const baseUrl =
//             process.env.KLINGAI_API_URL || "https://api.klingai.com/v1/videos";


//         console.log(baseUrl);
//         // 🔥 Parallel GET requests
//         const results = await Promise.all(
//             taskIds.map(async (taskId) => {
//                 const url = `${baseUrl}/${taskId}`;

//                 const res = await fetch(url, {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${apiToken}`,
//                     },
//                 });

//                 const data = await res.json();

//                 return {
//                     taskId,
//                     ok: res.ok,
//                     data,
//                 };
//             })
//         );

//         return NextResponse.json({ results });
//     } catch (err: any) {
//         console.error("KLING GET ERROR:", err);
//         return NextResponse.json(
//             { error: err.message || "Internal error" },
//             { status: 500 }
//         );
//     }
// }


// /app/api/klingai/get-videos/route.ts
import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firestore/firebaseAdmin";
import { generateKlingToken } from "@/lib/klingaiAuth";

export async function POST(req: Request) {
    try {
        const { taskIds, uid } = await req.json();

        if (!uid) {
            return NextResponse.json({ error: "Missing uid" }, { status: 400 });
        }

        if (!Array.isArray(taskIds) || taskIds.length === 0) {
            return NextResponse.json(
                { error: "taskIds[] required" },
                { status: 400 }
            );
        }

        const apiToken = generateKlingToken();
        const baseUrl =
            process.env.KLINGAI_API_URL || "https://api.klingai.com/v1/videos";

        // -------------------------------------------------------
        // 1️⃣ Fetch video statuses in parallel
        // -------------------------------------------------------
        const results = await Promise.all(
            taskIds.map(async (taskId) => {
                const url = `${baseUrl}/${taskId}`;
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                    },
                });

                const data = await res.json();

                return {
                    taskId,
                    ok: res.ok,
                    data,
                };
            })
        );

        // -------------------------------------------------------
        // 2️⃣ Batch update Firestore
        // -------------------------------------------------------
        const batch = adminFirestore.batch();

        for (const result of results) {
            if (!result.ok) continue;

            const taskId = result.taskId;
            const status = result.data?.data?.task_status;
            const videoUrl = result.data?.data?.task_result?.videos?.[0]?.url || null;
            console.log('==========');
            console.log(result);
            console.log('==========');

            console.log({ taskId, status, videoUrl });

            // 🔍 find the video document by taskId
            const videosRef = adminFirestore
                .collection("users")
                .doc(uid)
                .collection("videos");

            const snap = await videosRef.where("taskId", "==", taskId).limit(1).get();

            if (!snap.empty) {
                const docRef = snap.docs[0].ref;

                batch.update(docRef, {
                    status,
                    videoUrl,
                    updatedAt: new Date(),
                });
            }
        }

        await batch.commit();

        // -------------------------------------------------------
        // 3️⃣ Return updated video documents
        // -------------------------------------------------------
        const updatedVideosSnap = await adminFirestore
            .collection("users")
            .doc(uid)
            .collection("videos")
            .orderBy("createdAt", "desc")
            .limit(20)
            .get();

        const updatedVideos = updatedVideosSnap.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({
            results,
            updatedVideos,
        });
    } catch (err: any) {
        console.error("KLING GET ERROR:", err);
        return NextResponse.json(
            { error: err.message || "Internal error" },
            { status: 500 }
        );
    }
}

