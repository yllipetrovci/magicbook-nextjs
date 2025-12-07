import { NextResponse } from "next/server";
import { auth } from "@/lib/firestore/firebaseAdmin";

export async function POST(request: Request) {
    const { idToken } = await request.json();
    try {
        const decoded = await auth.verifyIdToken(idToken);
        return NextResponse.json({ uid: decoded.uid }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
