import { generateKlingToken } from "@/lib/klingaiAuth";

export interface ImageToVideoPayload {
    image: string;
    prompt: string;
    model_name?: string;
    duration?: string;
}

export async function klingGetGeneratedVide(taskId: string) {
    if (!taskId) {
        throw new Error("Missing task id");
    }

    const mockProcessing = {
        "code": 0,
        "message": "SUCCEED",
        "request_id": "8dde5a2b-d74d-4c95-bcd4-a95ea452046c",
        "data": {
            "task_id": "822953089408827433",
            "task_status": "processing",
            "task_info": {},
            "task_result": {},
            "task_status_msg": "",
            "created_at": 1764235825029,
            "updated_at": 1764235834382
        }
    }

    return mockProcessing;

    const apiUrl =
        `${process.env.KLINGAI_API_URL}/${taskId}` ||
        `https://api.klingai.com/v1/videos/image2video/${taskId}`;

    const apiToken = generateKlingToken();
    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("KlingAI API Error:", data);
        throw new Error(data.message || "Failed to generate video");
    }

    return data; // 🎉 return the final result
}

export async function klingImageToVideo({
    image,
    prompt,
    model_name = "kling-v1",
    duration = "5"
}: ImageToVideoPayload) {
    if (!image || !prompt) {
        throw new Error("Missing image or prompt");
    }

    const succeedMock = {
        "code": 0,
        "message": "SUCCEED",
        "request_id": "0e748220-9934-49a8-aec6-f204b7047b56",
        "data": {
            "task_id": "822953089408827433",
            "task_status": "submitted",
            "task_info": {},
            "created_at": 1764235825029,
            "updated_at": 1764235825029
        }
    }

    return succeedMock;



    const apiUrl =
        process.env.KLINGAI_API_URL ||
        "https://api.klingai.com/v1/videos/image2video";

    const apiToken = generateKlingToken();

    const payload = {
        model_name,
        image,
        prompt,
        cfg_scale: 0.5,
        mode: "pro",
        duration
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("KlingAI API Error:", data);
        throw new Error(data.message || "Failed to generate video");
    }

    return data; // 🎉 return the final result
}
