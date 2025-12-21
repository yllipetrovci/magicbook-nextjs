import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";
import { StoryStatus } from "@/app/types";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        let uid: string | null = null;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const idToken = authHeader.substring(7); // Remove "Bearer "
            const decoded = await adminAuth.verifyIdToken(idToken);
            uid = decoded.uid;
        } else {
            const sessionCookie = req.cookies.get("session")?.value;
            if (sessionCookie) {
                const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
                uid = decoded.uid;
            }
        }

        if (!uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch stories from Firestore
        const storiesRef = adminFirestore.collection("users").doc(uid).collection("stories");
        const snapshot = await storiesRef.orderBy("createdAt", "desc").get();

        const statusParam = req.nextUrl.searchParams.get("status") || "";
        const statuses = statusParam
            .split(",")
            .map(status => status.trim().toLowerCase())
            .filter(Boolean);
        const idsParam = req.nextUrl.searchParams.get("ids") || "";
        const ids = new Set(
            idsParam
                .split(",")
                .map(id => id.trim())
                .filter(Boolean)
        );

        const stories = snapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            .filter((story: any) => {
                if (ids.size > 0) {
                    return ids.has(story.id);
                }
                if (statuses.length === 0) return true;
                const storyStatus =
                    typeof story.status === "string" ? story.status.toLowerCase() : "";
                return (
                    storyStatus === StoryStatus.PENDING ||
                    storyStatus === StoryStatus.PROCESSING ||
                    storyStatus === StoryStatus.COMPLETED ||
                    storyStatus === StoryStatus.FAILED
                )
                    ? statuses.includes(storyStatus)
                    : statuses.includes(StoryStatus.PENDING);
            });

        return NextResponse.json({ stories }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching stories:", error);
        return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
    }
}
