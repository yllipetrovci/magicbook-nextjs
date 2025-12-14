'use client';

import { useEffect, useState } from "react";
import { generatePageImagePrompt } from "@/lib/prompts/pageImageGeneration";
import { generateCoverImagePrompt } from "@/lib/prompts/coverGeneration";
import { pageImageGenerationNano } from "@/lib/prompts/nano-banano/pageImageGenerationNano";

// TODO: replace with your real VEO generation function
import { generateVeoScenePrompt } from "@/lib/prompts/deepseek-veo3-generateText";

const STORAGE_KEY = "storybook-test-form";

const mockStory = {
  "title": "Princess Kompi's Starlight Christmas",
  "author": "Kompi & AI Storymaker",
  "coverImageAlt": "A royal 3D illustration of Princess Kompi in a velvet space-themed dress, standing on a glowing turtle-shell platform at the Enchanted Turtle Docks under a starry Christmas sky with a tiny glowing star-turtle companion.",
  "pages": [
    {
      "imageAltText": "A magical 3D scene of the Enchanted Turtle Docks at twilight. Giant, gentle star-turtles with crystalline shells drift peacefully in a calm bay. Their shells twinkle with constellations, and warm lanterns float between ancient wooden piers decorated with frost and holly.",
      "text": "High above the world, where the sky turns to starlight, floated the Enchanted Turtle Docks. Here, the gentle star-turtles rested between journeys, their crystal shells holding the glow of a thousand Christmas wishes.",
      "mainCharacterIncluded": false
    },
    {
      "imageAltText": "Princess Kompi, a toddler with a round face, high wavy pigtails, and a soft smile, wears a deep blue velvet dress dotted with silver stars. She carefully places a glowing star-shaped cookie on the edge of a pier, watching the water with her large, round dark-brown eyes.",
      "text": "Princess Kompi loved visiting the docks. With a happy hum, she left a sparkling star-cookie by the water—a tiny gift for her star-turtle friends.",
      "mainCharacterIncluded": true
    },
    {
      "imageAltText": "A close-up 3D view of a tiny, newborn star-turtle. It has enormous, curious eyes and a soft shell that flickers weakly, like a candle about to go out. It nudges a floating piece of tinsel sadly.",
      "text": "But one little star-turtle was lost and lonely. Its shell-light was fading, too small and new to shine on its own. It missed the warm glow of the Christmas Star, its true home.",
      "mainCharacterIncluded": false
    },
    {
      "imageAltText": "Princess Kompi is not in the scene. The tiny star-turtle follows a trail of Kompi's fallen star-cookie crumbs. It moves past giant, sleeping turtle shadows and under arches woven with magical, glowing ice.",
      "text": "The little turtle saw a trail of glittering crumbs! With a hopeful wiggle, it began to follow the sparkly path, past sleeping giants and arches of glowing ice.",
      "mainCharacterIncluded": false
    },
    {
      "imageAltText": "Princess Kompi sits cross-legged on the dock, her full cheeks lit with a gentle glow. The tiny star-turtle rests in her lap, snuggled in a velvet ribbon. Kompi holds a shimmering sugar crystal above it, and the turtle's shell begins to brighten.",
      "text": "Kompi found the shivering turtle! \"You need starlight,\" she whispered. She offered her last sugar crystal, full of Christmas magic. The little turtle snuggled close, and its shell began to glow warmly.",
      "mainCharacterIncluded": true
    },
    {
      "imageAltText": "A wide 3D shot of the Docks from above. The newborn star-turtle, now shining brightly, swims joyously beside a giant parent turtle. Their combined shell-lights paint beautiful, swirling constellations across the dark water and snowy piers. Princess Kompi is not visible; the focus is on the magical reunion.",
      "text": "With a happy flicker, the little turtle's light shone strong! It zipped through the water, painting Christmas constellations, until it found its family. And the Docks sparkled brighter than ever with the magic of a shared wish.",
      "mainCharacterIncluded": false
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
