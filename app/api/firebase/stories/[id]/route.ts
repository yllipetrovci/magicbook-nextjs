import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const sessionCookie = req.cookies.get("session")?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        const uid = decoded.uid;
        const storyId =
            params?.id ||
            req.nextUrl.pathname.split("/").filter(Boolean).pop() ||
            "";

            console.log("storyId:", storyId);
            console.log("params:");
            console.log({params});
        if (!storyId) {
            return NextResponse.json({ error: "Missing story id" }, { status: 400 });
        }

        await adminFirestore
            .collection("users")
            .doc(uid)
            .collection("stories")
            .doc(storyId)
            .delete();

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting story:", error);
        return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
    }
}
