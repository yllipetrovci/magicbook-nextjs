import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";
import { plans } from "@/lib/constants/plans";
import admin from "firebase-admin";

const increment = admin.firestore.FieldValue.increment;

export async function POST(req: NextRequest) {
    try {
        const sessionCookie = req.cookies.get("session")?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        const uid = decoded.uid;
        const { planId } = await req.json();

        const selectedPlan = plans.find(plan => plan.id === planId);
        const creditsToAdd = selectedPlan?.credits ?? 0;
        if (!creditsToAdd) {
            return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        const userRef = adminFirestore.collection("users").doc(uid);
        await userRef.update({
            credits: increment(creditsToAdd),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        const userDoc = await userRef.get();
        const userData = userDoc.data();

        return NextResponse.json({
            credits: userData?.credits ?? 0,
        });
    } catch (error: any) {
        console.error("Error adding credits:", error);
        return NextResponse.json({ error: "Failed to add credits" }, { status: 500 });
    }
}
