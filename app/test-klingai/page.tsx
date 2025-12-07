"use client";

import { useState, ChangeEvent } from "react";

/** Convert File -> Base64 String (Data URL) */
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/** Remove "data:image/...;base64," prefix */
function cleanBase64(dataUrl: string): string {
    return dataUrl.replace(/^data:(image\/\w+);base64,/, "");
}

export default function KlingAiTest() {
    const [status, setStatus] = useState("Idle");
    const [imageValue, setImageValue] = useState("");
    const [prompt, setPrompt] = useState("A cinematic shot of this scene");
    const [result, setResult] = useState<any>(null);

    /** Handle file */
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus("Reading file...");

        const dataUrl = await fileToBase64(file);
        setImageValue(dataUrl); // Keep preview
    };

    /** Send request */
    const handleGenerate = async () => {
        setStatus("Sending request...");
        setResult(null);

        try {
            let finalImage: string = imageValue;

            // If base64 Data URL → clean it
            if (imageValue.startsWith("data:image")) {
                finalImage = cleanBase64(imageValue);
            }

            // If user typed a URL → leave as-is
            // KlingAI accepts both raw Base64 and image URLs.

            const res = await fetch("/api/klingai/image-to-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: finalImage,
                    prompt,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Kling error:", data);
                setStatus("Error");
                throw new Error(data.error || "Something failed");
            }

            setResult(data);
            setStatus("Success! Video request started.");

        } catch (err: any) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <div className="p-8 font-sans max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-black">
                KlingAI Image-to-Video Test
            </h1>

            <div className="space-y-6">

                {/* Upload or URL */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">
                        Upload Image or Paste URL
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm mb-3 text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
                    />

                    <div className="text-center my-2 text-gray-500">- OR -</div>

                    <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        value={imageValue}
                        onChange={(e) => setImageValue(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    />

                    {imageValue && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Preview:</p>
                            <img
                                src={imageValue}
                                alt="Preview"
                                className="max-h-48 rounded border"
                            />
                        </div>
                    )}
                </div>

                {/* Prompt */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-black">
                        Prompt
                    </label>
                    <textarea
                        rows={3}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Generate Video
                </button>

                {/* Output */}
                <div className="mt-6 p-4 bg-gray-100 rounded text-black">
                    <p><strong>Status:</strong> {status}</p>

                    {result && (
                        <pre className="mt-2 text-xs overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
