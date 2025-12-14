import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";
import { klingImageToVideo } from "@/lib/klingai";
import { animationStylesPrompt, AnimationStyle } from "@/lib/constants/animation-styles-prompt";
import { plans } from "@/lib/constants/plans";
import { createUserVideo } from "@/lib/firestore/videos";

/* --------------------------------------------- */
/* 1. Validate request body                      */
/* --------------------------------------------- */
function validateInput(email?: string, password?: string) {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
}

/* --------------------------------------------- */
/* 2. Create user in Firebase Auth               */
/* --------------------------------------------- */
async function createFirebaseUser(email: string, password: string) {
    console.log("Creating Firebase user with email:", email);
    return await adminAuth.createUser({ email, password });
}

/* --------------------------------------------- */
/* 3. Create user Firestore profile              */
/* --------------------------------------------- */
async function createFirestoreUser(uid: string, email: string, plan: string) {

    const selectedPlanItem = plans.find((planItem) => planItem.id === plan);


    await adminFirestore.collection("users").doc(uid).set({
        email,
        credits: selectedPlanItem?.credits,
        plan: selectedPlanItem?.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

/* --------------------------------------------- */
/* 4. Sign user in via Firebase REST API         */
/* --------------------------------------------- */
async function signInUser(email: string, password: string) {
    const apiKey = process.env.PRIVATE_FIREBASE_API_KEY;

    const loginRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        }
    ).then((res) => res.json());

    if (loginRes.error) {
        throw new Error(loginRes.error.message);
    }

    return loginRes.idToken as string;
}

/* --------------------------------------------- */
/* 5. Create session cookie                      */
/* --------------------------------------------- */
async function createSessionCookie(idToken: string) {
    const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 days
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    return { cookie, expiresIn };
}

/* --------------------------------------------- */
/* 6. Attach cookie to response                  */
/* --------------------------------------------- */
function setSessionCookie(sessionCookie: string, expiresIn: number) {
    const response = NextResponse.json({ created: true });

    response.cookies.set({
        name: "session",
        value: sessionCookie,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: expiresIn / 1000,
    });

    return response;
}

/* --------------------------------------------- */
/* 7. Main POST Handler                          */
/* --------------------------------------------- */
export async function POST(req: Request) {
    try {
        const { email, password, selectedPlanId } = await req.json();


        // deepseekAPI

        // const key: AnimationStyle = animationStyle;
        // const prompt = animationStylesPrompt[key].prompt;
        validateInput(email, password);
        // Payments here

        // console.log({ prompt });x
        const user = await createFirebaseUser(email, password);

        console.log("User created:", user);
        await createFirestoreUser(user.uid, email, selectedPlanId);

        // const video = await klingImageToVideo({
        //     image,
        //     prompt
        // });

        // createUserVideo(user.uid, {
        //     taskId: video.data.task_id,
        //     thumbnail: null,
        //     prompt,
        //     style: key,
        //     status: "processing",
        //     videoUrl: null,
        // });



        // const videoJson = await video.json();

        const idToken = await signInUser(email, password);
        const { cookie, expiresIn } = await createSessionCookie(idToken);

        return setSessionCookie(cookie, expiresIn);

    } catch (error: any) {
        console.error("SIGNUP ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Unknown error" },
            { status: 500 }
        );
    }
}
