'use client'

import { useState, useEffect } from "react";
import { COMPANION_PRESETS, FANTASY_LOCATIONS, PAGE_COUNTS, STORY_TONES } from '../../(public)/steps/customize-and-finish/component-configs';
import { characterExtractionPrompt } from '../../../../lib/prompts/characterExtraction';
import { generateStoryPrompt } from "@/lib/prompts/storyGeneration";

const BOOK_STYLES = [
    'fantasy', 'royal', 'minimal', 'watercolor', 'comic',
    'cozy', '3d', 'vintage', 'sparkly', 'anime', 'pixel', 'clay',
];

const themeKeys = [
    { id: 'christmas', key: 'theme_santa' },
    { id: 'comic', key: 'theme_comic' },
    { id: 'fantasy', key: 'theme_fantasy' },
    { id: 'epic', key: 'theme_epic' },
    { id: 'royal', key: 'theme_royal' },
    { id: 'superhero', key: 'theme_superhero' },
    { id: 'special', key: 'theme_special' },
];

const STORAGE_KEY = "storybook-test-form";

const TestIMGGEN = () => {

    const characterPrompt: any = characterExtractionPrompt();

    const [form, setForm] = useState({
        location: "",
        companions: "",
        tone: "",
        characterType: "",
        pageCount: "",
        style: "",
        theme: "",
        childAge: "",
        heroName: "",
        characterLook: "",
        secretWish: "",
    });

    const [storyPrompt, setStoryPrompt] = useState<any>({})
    const [copied, setCopied] = useState(false);
    const [copiedImagePrompt, setCopiedImagePrompt] = useState(false);

    // ------------------------------------------------------------
    // 1️⃣ LOAD SAVED DATA FROM LOCAL STORAGE ON FIRST RENDER
    // ------------------------------------------------------------
    useEffect(() => {
        if (typeof window === "undefined") return;

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setForm(parsed);
            } catch (err) {
                console.error("Failed to parse localStorage form", err);
            }
        }
    }, []);

    // ------------------------------------------------------------
    // 2️⃣ SAVE FORM TO LOCAL STORAGE ON EVERY CHANGE
    // ------------------------------------------------------------
    useEffect(() => {
        if (typeof window === "undefined") return;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }, [form]);

    // ------------------------------------------------------------
    // HANDLE FIELD CHANGE
    // ------------------------------------------------------------
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // ------------------------------------------------------------
    // SUBMIT → GENERATE STORY PROMPT
    // ------------------------------------------------------------
    const handleSubmit = () => {
        const { system, user } = generateStoryPrompt(form);
        setStoryPrompt({ system, user });
        setCopied(false);
    };

    // ------------------------------------------------------------
    // COPY RESULT TO CLIPBOARD
    // ------------------------------------------------------------
    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(storyPrompt, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const copyToClipboardCharacterPrompt = () => {
        navigator.clipboard.writeText(JSON.stringify(characterPrompt, null, 2));
        setCopiedImagePrompt(true);
        setTimeout(() => setCopiedImagePrompt(false), 1500);
    };




    return (
        <div className="p-10 text-white">
            <h1 className="text-2xl font-bold mb-6">TEST IMG Generator</h1>

            {/* Character Prompt */}
            <div className="relative border border-white p-4 mb-6 rounded-lg">
                <button
                    onClick={copyToClipboardCharacterPrompt}
                    className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
                >
                    {copiedImagePrompt ? "Copied!" : "Copy"}
                </button>
                <p className="font-bold mb-2">characterPrompt</p>
                <pre className="text-xs">{JSON.stringify(characterPrompt, null, 2)}</pre>
            </div>

            {/* INPUT FORM */}
            <div className="bg-white text-black p-6 rounded-xl border mb-8">

                <div className="flex flex-wrap gap-6">

                    {/* LOCATION */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Location</label>
                        <select name="location" value={form.location} className="border p-2" onChange={handleChange}>
                            <option value="">Select...</option>
                            {FANTASY_LOCATIONS.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    {/* COMPANIONS */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Companions</label>
                        <select name="companions" value={form.companions} className="border p-2" onChange={handleChange}>
                            <option value="">Select...</option>
                            {COMPANION_PRESETS.map((item) => (
                                <option key={item.text} value={item.text}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* TONE */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Tone</label>
                        <select name="tone" value={form.tone} className="border p-2" onChange={handleChange}>
                            <option value="">Select...</option>
                            {STORY_TONES.map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* CHARACTER TYPE */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Character Type</label>
                        <select name="characterType" value={form.characterType} className="border p-2" onChange={handleChange}>
                            <option value="">Select...</option>
                            {['royal', 'hero'].map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    {/* PAGE COUNT */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Page Count</label>
                        <select name="pageCount" value={form.pageCount} className="border p-2" onChange={handleChange}>
                            <option value="">Select...</option>
                            {PAGE_COUNTS.map((item) => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* STYLE */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Style</label>
                        <select name="style" value={form.style} className="border p-2" onChange={handleChange}>
                            <option value="">Select...</option>
                            {BOOK_STYLES.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    {/* THEME */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Theme</label>
                        <select name="theme" value={form.theme} className="border p-2" onChange={handleChange}>
                            <option value="">Select...</option>
                            {themeKeys.map((item) => (
                                <option key={item.id} value={item.id}>{item.key}</option>
                            ))}
                        </select>
                    </div>

                    {/* CHILD AGE */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Child Age</label>
                        <input name="childAge" value={form.childAge} className="border p-2" onChange={handleChange} />
                    </div>

                    {/* HERO NAME */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Hero Name</label>
                        <input name="heroName" value={form.heroName} className="border p-2" onChange={handleChange} />
                    </div>

                    {/* SECRET WISH */}
                    <div className="flex flex-col w-64">
                        <label className="font-semibold mb-1">Secret Wish</label>
                        <input name="secretWish" value={form.secretWish} className="border p-2" onChange={handleChange} />
                    </div>

                    {/* CHARACTER LOOK */}
                    <div className="flex flex-col w-80">
                        <label className="font-semibold mb-1">Character Look</label>
                        <textarea rows={10} name="characterLook" value={form.characterLook} className="border p-2" onChange={handleChange} />
                    </div>

                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Submit Config
                </button>

            </div>

            {/* RESULT SECTION */}
            <div className="border border-white p-6 rounded-xl bg-black/30 relative">
                <h2 className="text-xl font-bold mb-4">generateStoryPrompt RESULT</h2>

                {/* Copy Button */}
                <button
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>

                <pre className="text-sm whitespace-pre-wrap mt-6">
                    {JSON.stringify(storyPrompt, null, 2)}
                </pre>
            </div>

        </div>
    );
};

export default TestIMGGEN;
