import { NextResponse } from "next/server";
import { generateKlingToken } from "@/lib/klingaiAuth";

interface ImageToVideoRequest {
    image: string;
    prompt: string;
    model_name?: string;
    duration?: string;
}

export async function POST(request: Request) {
    try {
        console.log("KLINGAI_API REQUEST");

        const body = (await request.json()) as ImageToVideoRequest;

        const {
            image,
            prompt,
            model_name = "kling-v1",
            duration = "5"
        } = body;

        if (!image || !prompt) {
            return NextResponse.json(
                { error: "Missing image or prompt" },
                { status: 400 }
            );
        }

        const apiUrl =
            process.env.KLINGAI_API_URL ||
            "https://api.klingai.com/v1/videos/image2video";

        // 🔥 Generate KlingAI JWT token
        const apiToken = generateKlingToken();

        const payload = {
            model_name,
            image,
            prompt,
            cfg_scale: 0.5,
            mode: "pro",
            duration
        };

        // 🔥 Send request to KlingAI
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // IMPORTANT: No Bearer prefix
                Authorization: `Bearer ${apiToken}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("KlingAI API Error:", data);
            return NextResponse.json(
                { error: data.message || "Failed to generate video" },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Error in image-to-video API:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
