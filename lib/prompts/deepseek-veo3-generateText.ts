export const generateVeoScenePrompt = (config: any) => {
    const {
        characterLook,
        style,
        theme,
        tone,
        characterType,
        childAge,
        companions,
        secretWish,
        imageAltText,
        mainCharacterIncluded,
    } = config;

    // Always 5 seconds per page
    const durationSec = 5;

    // RANDOM TRANSITION SET
    const transitions = [
        { start: "fade-in from black", end: "fade-out" },
        { start: "soft cross-dissolve", end: "cross-dissolve" },
        { start: "light bloom fade-in", end: "light bloom fade-out" },
        { start: "magical sparkle dissolve-in", end: "sparkle dissolve-out" },
        { start: "white flash-in", end: "soft fade-out" },
        { start: "dreamy blur fade-in", end: "dreamy blur fade-out" },
        { start: "mist reveal fade-in", end: "mist drift fade-out" },
        { start: "warm glow reveal", end: "warm glow fade-out" },
    ];

    // Random transition pick
    const transition = transitions[Math.floor(Math.random() * transitions.length)];

    const system = `
You create cinematic VEO3 prompts + emotional TTS lines.

You must support dynamic transitions:
- Each page will randomly use one transition pair.
- Transitions must be described visually, not technically.
- Use only the transition provided in the user message as "transition.start" and "transition.end".

CINEMATIC SCENE RULES:
- 3–6 cinematic sentences.
- Pure visuals: camera, lighting, mood, atmosphere.
- No dialogue inside description.
- No narration, no explanation of story.
- Must follow the book tone/style/theme.

TTS LINE RULES:
- One emotional line (4–12 words).
- Soft, gentle little girl voice.
- Must reflect the emotion of the page.
- Do NOT describe the voice — only the spoken line.

CHARACTER RULES:
- If mainCharacterIncluded = true → child MUST match characterLook exactly.
- If mainCharacterIncluded = false → child MUST NOT appear visually.

TIMING:
- Always 5 seconds per page.

STRICT OUTPUT ONLY:
{
  "veoScenePrompt": "...",
  "ttsLine": "...",
  "durationSec": 5,
  "transition": {
    "start": "...",
    "end": "..."
  }
}
`;

    const CHARACTER_RULE = mainCharacterIncluded
        ? `The child MUST appear visually and MUST match EXACTLY: ${characterLook}`
        : `The child MUST NOT appear visually. TTS may still be a whispering child's voice.`;

    const user = `
Create a VEO3 cinematic scene + emotional TTS line.

BOOK SETTINGS:
- Style: ${style}
- Theme: ${theme}
- Tone: ${tone}
- Character Type: ${characterType}
- Child Age: ${childAge}
- Companions: ${companions}
- Secret Wish: ${secretWish}

PAGE CONTENT:
${imageAltText}

CHARACTER RULE:
${CHARACTER_RULE}

TRANSITION FOR THIS PAGE:
- Start: ${transition.start}
- End: ${transition.end}

TIMING:
- Scene duration: 5 seconds.

RETURN EXACTLY:

{
  "veoScenePrompt": "...",
  "ttsLine": "...",
  "durationSec": 5,
  "transition": {
    "start": "${transition.start}",
    "end": "${transition.end}"
  }
}
`;

    return { system, user };
};
