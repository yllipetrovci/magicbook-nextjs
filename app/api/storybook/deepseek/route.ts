import { NextResponse } from "next/server";
import axios from "axios";

//
// 1. SAFEST JSON EXTRACTOR — never crashes
//
function extractJSON(text: string) {
    try {
        const match = text.match(/\{[\s\S]*\}/);
        if (!match) return null;
        return JSON.parse(match[0]);
    } catch (err) {
        console.error("JSON parse failed:", text);
        return null;
    }
}

//
// 2. Retry wrapper (DeepSeek sometimes fails JSON on first try)
//
async function deepseekRequest(payload: any, retries = 2): Promise<any> {
    try {
        const res = await axios.post(
            "https://api.deepseek.com/chat/completions",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    "Content-Type": "application/json"
                },
            }
        );

        return res.data;
    } catch (err) {
        if (retries > 0) {
            console.warn("DeepSeek retrying...", retries);
            return deepseekRequest(payload, retries - 1);
        }
        throw err;
    }
}

//
// 3. MAIN ROUTE
//
export async function POST(req: Request) {
    try {
        const {
            heroName,
            characterLook,
            style,
            theme,
            tone,
            characterType,
            childAge,
            pageCount,
            location,
            companions,
            secretWish
        } = await req.json();

        //
        // STORY SYSTEM PROMPT (DeepSeek version)
        //
        const systemPrompt = `
You are a professional children's storybook author.
Your job is to generate warm, emotionally rich, age-appropriate stories.

STRICT RULES:
- You MUST return ONLY valid JSON.
- Do NOT add explanations, comments, or markdown.
- Do NOT wrap JSON in fences.
- Output must be valid JSON or the system will fail.

Story rules:
- Integrate story tone strongly.
- Use the theme consistently.
- Keep language warm, magical, readable for children.
- Each page must describe one moment.
`;

        //
        // STORY USER PROMPT (Dynamic)
        //
        const userPrompt = `
Create a children's storybook using these parameters:

heroName: ${heroName}
characterLook: ${characterLook}
style: ${style}
theme: ${theme}
tone: ${tone}
characterType: ${characterType}
age: ${childAge}
pageCount: ${pageCount}
location: ${location}
companions: ${companions}
secretWish: ${secretWish}

Return JSON in EXACTLY this structure:

{
  "title": "string",
  "author": "${heroName} & AI Storymaker",
  "coverImageAlt": "string",
  "pages": [
    {
      "imageAltText": "string",
      "text": "string",
      "mainCharacterIncluded": true
    }
  ]
}
`;

        //
        // 4. MAKE DEEPSEEK REQUEST
        //
        const deepseekPayload = {
            model: "deepseek-chat",
            temperature: 0.9,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        };

        const storyResponse = await deepseekRequest(deepseekPayload);

        const raw = storyResponse.choices?.[0]?.message?.content || "";
        const parsedJSON = extractJSON(raw);

        if (!parsedJSON) {
            return NextResponse.json(
                {
                    error:
                        "DeepSeek returned invalid JSON and could not be parsed. Try again.",
                    raw
                },
                { status: 500 }
            );
        }

        //
        // 5. SUCCESS RESPONSE
        //
        return NextResponse.json({
            success: true,
            story: parsedJSON,
            raw
        });

    } catch (error: any) {
        console.error("DeepSeek Story Error:", error);
        return NextResponse.json(
            { error: error.message || "Story generation failed." },
            { status: 500 }
        );
    }
}
