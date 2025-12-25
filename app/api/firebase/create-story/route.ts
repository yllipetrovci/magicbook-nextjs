import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";
import { createJob } from "@/lib/redis/createJob";
import admin from "firebase-admin";

const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;

export async function POST(req: NextRequest) {
    try {
        const sessionCookie = req.cookies.get("session")?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        const uid = decoded.uid;

        const { config } = await req.json();
        if (!config || typeof config !== "object") {
            return NextResponse.json({ error: "Missing config" }, { status: 400 });
        }

        const { heroImageOriginal, parentImageOriginal, heroImage, parentImage, ...configWithoutOriginals } = config;

        const storyRef = await adminFirestore
            .collection("users")
            .doc(uid)
            .collection("stories")
            .add({
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                status: "pending",
                storyContent: {
                    title: "loading...",
                    author: "loading...",
                    coverImageAlt: "loading...",
                    pages: [],
                    coverImg: null,
                },
            });

        createJob({
            type: "story",
            config: { ...configWithoutOriginals, storyDocId: storyRef.id, userId: uid },
        });

        return NextResponse.json({ created: true, storyId: storyRef.id });
    } catch (error: any) {
        console.error("CREATE STORY ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Unknown error" },
            { status: 500 }
        );
    }
}
