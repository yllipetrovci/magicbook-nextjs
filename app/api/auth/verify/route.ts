import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";

export async function POST(request: Request) {
    const { idToken } = await request.json();
    try {
        const decoded = await getAuth().verifyIdToken(idToken);
        return NextResponse.json({ uid: decoded.uid }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
