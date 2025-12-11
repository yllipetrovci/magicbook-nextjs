'use client';

import { useEffect, useState } from "react";
import { generatePageImagePrompt } from "@/lib/prompts/pageImageGeneration";
import { generateCoverImagePrompt } from "@/lib/prompts/coverGeneration";
import { pageImageGenerationNano } from "@/lib/prompts/nano-banano/pageImageGenerationNano";

// TODO: replace with your real VEO generation function
import { generateVeoScenePrompt } from "@/lib/prompts/deepseek-veo3-generateText";

const STORAGE_KEY = "storybook-test-form";

const mockStory = {
    "title": "Guxhi and the Starlight Turtle",
    "author": "Guxhi & AI Storymaker",
    "coverImageAlt": "A detailed 3D render of a child with voluminous curly hair and a gap-toothed smile, sitting on a glowing turtle at magical docks under a starry, Christmas-themed nebula.",
    "pages": [
        {
            "imageAltText": "A panoramic 3D view of the Enchanted Turtle Docks at dusk, with glowing lily pad platforms and ancient, star-etched stone pillars rising from calm, reflective water.",
            "text": "At the Enchanted Turtle Docks, Christmas arrived on a special turtle shell. Each year, the Starlight Turtle would bring glowing orbs from the cosmos to light the holiday skies.",
            "mainCharacterIncluded": false
        },
        {
            "imageAltText": "Guxhi, with their wide eyes and gap-toothed smile, peers worriedly over the dock's edge where the water's reflection shows no Christmas lights.",
            "text": "Guxhi loved the turtle's light show most of all. But the docks were dark and quiet. 'Where is our Christmas light?' they wondered, feeling a hero's courage stir in their heart.",
            "mainCharacterIncluded": true
        },
        {
            "imageAltText": "Deep below the docks, the Starlight Turtle swims slowly, its usually glowing shell dim because a cluster of space-kelp is tangled around its flippers.",
            "text": "Far below, the great turtle was stuck. Thick, heavy kelp from a drifting space-reef had wrapped around its legs, slowing it down and dimming its light.",
            "mainCharacterIncluded": false
        },
        {
            "imageAltText": "Guxhi kneels on a lily pad, using a long, smooth reed to carefully probe the dark water, searching for a sign of their friend.",
            "text": "Guxhi knew the turtle was in trouble. They took a deep breath, their curly hair bouncing. 'I'll find you,' they promised the quiet water, and began to search.",
            "mainCharacterIncluded": true
        },
        {
            "imageAltText": "A school of tiny, bioluminescent fish try to nibble at the thick space-kelp, but their small lights are not enough to cut through the strong fibers.",
            "text": "The water creatures tried to help. Glimmer-fish nibbled, and eels pulled, but the strange kelp was as strong as anchor chains. The turtle remained trapped.",
            "mainCharacterIncluded": false
        },
        {
            "imageAltText": "Guxhi, with a determined grin, uses a sharp, blessed moon-shell to saw through the last strand of kelp, as the turtle's shell begins to glow brightly again.",
            "text": "Guxhi dove down! With a special shell they found, they sawed and sawed. *Snap!* The kelp broke free. The turtle's shell erupted in light, painting the sky with Christmas constellations.",
            "mainCharacterIncluded": true
        }
    ]
}

const TestPageImages = () => {
    const [story, setStory] = useState<any>(null);
    const [configs, setConfigs] = useState<any>(null);

    const [pagePrompts, setPagePrompts] = useState<any[]>([]);
    const [coverPrompt, setCoverPrompt] = useState<any>(null);

    // NEW: VEO3 prompts
    const [veoPrompts, setVeoPrompts] = useState<any[]>([]);
    const [veoCopiedIndex, setVeoCopiedIndex] = useState<number | null>(null);

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [coverCopied, setCoverCopied] = useState<boolean>(false);

    // ---------------------------------------------------
    // LOAD CONFIG + STORY
    // ---------------------------------------------------
    useEffect(() => {
        const savedConfigs = localStorage.getItem(STORAGE_KEY);
        setStory(mockStory);

        if (savedConfigs) setConfigs(JSON.parse(savedConfigs));
    }, []);

    // ---------------------------------------------------
    // GENERATE ALL PROMPTS
    // ---------------------------------------------------
    const generateAllPrompts = () => {
        if (!story || !configs) return;

        // COVER IMAGE PROMPT
        const coverImagePrompt = generateCoverImagePrompt({
            characterLook: configs.characterLook,
            style: configs.style,
            theme: configs.theme,
            tone: configs.tone,
            characterType: configs.characterType,
            companions: configs.companions,
            childAge: configs.childAge,
            secretWish: configs.secretWish,
            imageAltText: story.coverImageAlt,
            mainCharacterIncluded: true,
        });
        setCoverPrompt(coverImagePrompt);

        // PAGE IMAGE PROMPTS
        const prompts = story.pages.map((page: any) =>
            pageImageGenerationNano({
                characterLook: configs.characterLook,
                style: configs.style,
                theme: configs.theme,
                tone: configs.tone,
                characterType: configs.characterType,
                companions: configs.companions,
                childAge: configs.childAge,
                secretWish: configs.secretWish,
                imageAltText: page.imageAltText,
                mainCharacterIncluded: page.mainCharacterIncluded,
            })
        );

        setPagePrompts(prompts);

        // VEO 3 PROMPTS
        const veoOutputs = story.pages.map((page: any) =>
            generateVeoScenePrompt({
                characterLook: configs.characterLook,
                style: configs.style,
                theme: configs.theme,
                tone: configs.tone,
                characterType: configs.characterType,
                companions: configs.companions,
                childAge: configs.childAge,
                secretWish: configs.secretWish,
                imageAltText: page.imageAltText,
                mainCharacterIncluded: page.mainCharacterIncluded,
            })
        );

        setVeoPrompts(veoOutputs);
    };

    // ---------------------------------------------------
    // COPY FUNCTIONS
    // ---------------------------------------------------
    const copyCoverPrompt = () => {
        navigator.clipboard.writeText(JSON.stringify(coverPrompt, null, 2));
        setCoverCopied(true);
        setTimeout(() => setCoverCopied(false), 1200);
    };

    const copyPrompt = (index: number) => {
        navigator.clipboard.writeText(JSON.stringify(pagePrompts[index], null, 2));
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1200);
    };

    const copyVeoPrompt = (index: number) => {
        navigator.clipboard.writeText(JSON.stringify(veoPrompts[index], null, 2));
        setVeoCopiedIndex(index);
        setTimeout(() => setVeoCopiedIndex(null), 1200);
    };

    // ---------------------------------------------------
    // UI
    // ---------------------------------------------------
    if (!story || !configs)
        return <div className="p-10 text-white">Loading story + configs...</div>;

    return (
        <div className="p-10 text-white">
            <h1 className="text-3xl font-bold mb-6">Page Image & Video Prompt Generator</h1>

            {/* BUTTON */}
            <button
                onClick={generateAllPrompts}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mb-8"
            >
                Generate All Prompts
            </button>

            {/* COVER PROMPT */}
            <div className="border border-white p-4 rounded-xl bg-black/30 relative mb-12">
                <h2 className="text-2xl font-bold mb-2">COVER IMAGE PROMPT</h2>

                <p className="opacity-80 mb-3">
                    <span className="font-bold">Alt Text:</span> {story.coverImageAlt}
                </p>

                <pre className="bg-black/20 p-3 rounded text-sm whitespace-pre-wrap">
                    {coverPrompt
                        ? JSON.stringify(coverPrompt, null, 2)
                        : "// Click Generate All to create prompt"}
                </pre>

                {coverPrompt && (
                    <button
                        onClick={copyCoverPrompt}
                        className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm"
                    >
                        {coverCopied ? "Copied!" : "Copy"}
                    </button>
                )}
            </div>

            {/* PAGE IMAGE PROMPTS */}
            <h2 className="text-2xl font-bold mt-10 mb-4">PAGE IMAGE PROMPTS</h2>
            <div className="space-y-8">
                {story.pages.map((page: any, idx: number) => (
                    <div
                        key={idx}
                        className="border border-white p-4 rounded-xl bg-black/30 relative"
                    >
                        <h3 className="text-xl font-bold mb-2">Page {idx + 1}</h3>

                        <p className="opacity-80 mb-3">
                            <span className="font-bold">Alt Text:</span> {page.imageAltText}
                        </p>

                        <pre className="bg-black/20 p-3 rounded text-sm whitespace-pre-wrap">
                            {pagePrompts[idx]
                                ? JSON.stringify(pagePrompts[idx], null, 2)
                                : "// Click Generate All to create prompt"}
                        </pre>

                        {pagePrompts[idx] && (
                            <button
                                onClick={() => copyPrompt(idx)}
                                className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm"
                            >
                                {copiedIndex === idx ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* VEO 3 SCENE PROMPTS */}
            <h2 className="text-2xl font-bold mt-14 mb-4">VEO 3 SCENE PROMPTS</h2>
            <div className="space-y-8">
                {story.pages.map((page: any, idx: number) => (
                    <div
                        key={idx}
                        className="border border-green-400 p-4 rounded-xl bg-black/20 relative"
                    >
                        <h3 className="text-xl font-bold mb-2">Veo Scene {idx + 1}</h3>

                        <p className="opacity-80 mb-3">
                            <span className="font-bold">Alt Text:</span> {page.imageAltText}
                        </p>

                        <pre className="bg-black/20 p-3 rounded text-sm whitespace-pre-wrap text-green-200">
                            {veoPrompts[idx]
                                ? JSON.stringify(veoPrompts[idx], null, 2)
                                : "// Click Generate All to create Veo prompts"}
                        </pre>

                        {veoPrompts[idx] && (
                            <button
                                onClick={() => copyVeoPrompt(idx)}
                                className="absolute top-4 right-4 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-md text-sm"
                            >
                                {veoCopiedIndex === idx ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestPageImages;
