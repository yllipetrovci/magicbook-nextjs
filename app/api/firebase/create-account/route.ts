import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";
import { klingImageToVideo } from "@/lib/klingai";
import { animationStylesPrompt, AnimationStyle } from "@/lib/constants/animation-styles-prompt";
import { plans } from "@/lib/constants/plans";
import { CREDITS_PER_PAGE, MIN_STORY_PAGE_COUNT } from "@/lib/constants/story-credits";
import { createUserVideo } from "@/lib/firestore/videos";
import { createJob } from "@/lib/redis/createJob"
import admin from "firebase-admin";
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
/* --------------------------------------------- */
/* 7. Main POST Handler                          */
/* --------------------------------------------- */
export async function POST(req: Request) {
    try {
        const { email, password, selectedPlanId, config,
            hasUpSellBook, hasUpsellVideo, hasUpsellDaily, mainPaymentIsDone
        } = await req.json();

        console.log("SERVER SIDE SIGNUP:");
        console.log({
            email, password, selectedPlanId, config,
            hasUpSellBook, hasUpsellVideo, hasUpsellDaily, mainPaymentIsDone
        })
        // deepseekAPI

        // const key: AnimationStyle = animationStyle;
        // const prompt = animationStylesPrompt[key].prompt;
        validateInput(email, password);
        // Payments here

        // console.log({ prompt });x
        const user = await createFirebaseUser(email, password);

        // Exclude original images from config for job processing
        const { heroImageOriginal, parentImageOriginal, heroImage, parentImage, ...configWithoutOriginals } = config;

        
        console.log("User created:", user);
        const selectedPlanItem = plans.find((planItem) => planItem.id === selectedPlanId);
        const requiredCredits = MIN_STORY_PAGE_COUNT * CREDITS_PER_PAGE;
        const availableCredits = selectedPlanItem?.credits ?? 0;
        if (availableCredits < requiredCredits) {
            return NextResponse.json(
                {
                    error: `Plan does not have enough credits for a ${MIN_STORY_PAGE_COUNT}-page story.`,
                },
                { status: 400 }
            );
        }

        await createFirestoreUser(user.uid, email, selectedPlanId);
        const storyDoc = await createStoryDocument(user.uid, configWithoutOriginals);
        console.log("Story document created with ID:", storyDoc.id);

        createJob({
            jobType: "story",
            config: { ...configWithoutOriginals, storyDocId: storyDoc.id, userId: user.uid },
        });

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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
}

/* --------------------------------------------- */
/* 3.5. Create story document for user           */
/* --------------------------------------------- */
async function createStoryDocument(uid: string, config: any) {
    const storyRef = await adminFirestore.collection("users").doc(uid).collection("stories").add({
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "pending", // pending, generating, completed, failed

        storyContent:{
            title: "loading...",
            author: "loading...",
            coverImageAlt: 'loading...', 
            pages: [],
            coverImg: null 
        }
    });

return storyRef;
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
