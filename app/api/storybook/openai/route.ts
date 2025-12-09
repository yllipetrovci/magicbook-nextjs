import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

import { characterExtractionPrompt } from "@/lib/prompts/characterExtraction";
import { generateStoryPrompt } from "@/lib/prompts/storyGeneration";
import { generateCoverImagePrompt } from "@/lib/prompts/coverGeneration";
import { generateThumbnailImagePrompt } from "@/lib/prompts/thumbnailGeneration";
import { generatePageImagePrompt } from "@/lib/prompts/pageImageGeneration";


function extractJSON(text: string) {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return null;
        return JSON.parse(jsonMatch[0]);
    } catch (err) {
        console.error("JSON extraction failed:", err);
        return null;
    }
}



export async function POST(req: Request) {
    try {
        const {
            heroImage,
            heroName,
            style,
            theme,
            tone,
            characterType,
            childAge,
            pageCount,
            location,
            companions,
            secretWish,
        } = await req.json();

        // -----------------------------
        // 1. Character Extraction
        // -----------------------------
        const charPrompts = characterExtractionPrompt();

        const extracted = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                { role: "system", content: charPrompts.system },
                { role: "user", content: charPrompts.user },
                { role: "user", content: heroImage, name: "heroImage" }
            ]
        });

        const rawContent: any = extracted.choices[0].message.content;
        const parsed = extractJSON(rawContent);

        if (!parsed) {
            throw new Error("Character extraction failed. Model did not return valid JSON.");
        }

        const characterLook = parsed.characterLook;

        // -----------------------------
        // 2. Story Generation
        // -----------------------------
        const storyPrompts = generateStoryPrompt({
            heroName, characterLook, style, theme, tone,
            characterType, childAge, pageCount, location, companions, secretWish
        });

        const storyRes = await openai.chat.completions.create({
            model: "gpt-4.1",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: storyPrompts.system },
                { role: "user", content: storyPrompts.user }
            ]
        });

        const rawContentStory: any = storyRes.choices[0].message.content;
        const parsedStory = extractJSON(rawContentStory);

        if (!parsed) {
            throw new Error("Story extraction failed. Model did not return valid JSON.");
        }

        const story = parsedStory.content

        // -----------------------------
        // 3. COVER Prompt
        // -----------------------------
        const coverPrompts = generateCoverImagePrompt({
            characterLook, style, theme, tone, characterType,
            childAge, companions, secretWish, heroName
        });

        const coverImagePrompt = coverPrompts.user;

        // -----------------------------
        // 4. THUMBNAIL Prompt
        // -----------------------------
        const thumbnailPrompts = generateThumbnailImagePrompt({
            characterLook, style, theme, tone, characterType,
            childAge, heroName
        });

        const thumbnailPrompt = thumbnailPrompts.user;

        // -----------------------------
        // 5. PAGE IMAGE PROMPTS
        // -----------------------------
        const pageImagePrompts = story.pages.map((p: any) => {
            const imgPrompt = generatePageImagePrompt({
                characterLook,
                style,
                theme,
                tone,
                characterType,
                companions,
                childAge,
                secretWish,
                imageAltText: p.imageAltText,
                mainCharacterIncluded: p.mainCharacterIncluded,
            });

            return {
                imageAltText: p.imageAltText,
                prompt: imgPrompt.user
            };
        });

        // -----------------------------
        // FINAL RESPONSE
        // -----------------------------
        return NextResponse.json({
            characterLook,
            story,
            coverImagePrompt,
            thumbnailPrompt,
            pageImagePrompts
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
