export const characterExtractionPrompt = () => {
  const system = `
You are an expert character–descriptor for children’s illustrated storybooks.
Return only unique visual traits that ensure consistent character illustrations.`;

  const user = `
Extract the child's unique visual characteristics from the uploaded image.

Return ONLY:
{
  "characterLook": "short visual description"
}
`;

  return { system, user };
};


export const generateCoverImagePrompt = (config: any) => {
  const {
    characterLook,
    style,
    theme,
    tone,
    characterType,
    childAge,
    companions,
    secretWish,
    heroName
  } = config;

  const system = `
You create cinematic, emotionally powerful children's storybook covers.
Your covers must look like they belong to the same book as the interior illustrations.

Core rules:
- Always include the main child consistently, matching the characterLook.
- The child must clearly appear about ${childAge} years old, with childlike proportions
  (slightly larger head-to-body ratio, soft youthful features).
- Preserve the child’s natural look from characterLook (hair, eyes, skin tone, and natural child teeth if smiling),
  but do NOT show tooth gaps or missing teeth; use a soft, natural full child smile.
- Keep the style, tone, and color palette aligned with the given style, theme, and tone.
- No text, no logos, no UI elements on the cover.
- The overall feel should be magical, warm, inviting, and visually readable from a distance.
`;

  const user = `
Create a COVER illustration for a children's storybook.

Variables:
- heroName: ${heroName}
- characterLook: ${characterLook}
- style: ${style}
- theme: ${theme}
- tone: ${tone}
- characterType: ${characterType}
- childAge: ${childAge}
- companions: ${companions}
- secretWish: ${secretWish}

Goals:
- The cover should instantly tell us this is a magical, emotional story starring ${heroName}.
- It should feel modern and visually pleasing for today's children's picture books.

Composition & movement:
- Place the child as the clear main focal point (center or strong off-center composition).
- Show the child in a dynamic, expressive pose (running, reaching, turning, laughing, looking up in wonder, etc.),
  rather than standing stiffly.
- Suggest motion through body posture, clothing, hair movement, and environment
  (swirling leaves, glowing particles, waves, clouds, or magical elements related to the theme).
- Use a cinematic sense of depth with a clear foreground, midground, and background.

Character & companions:
- Child MUST be included, matching characterLook and looking like a child of about ${childAge} years old.
- Use childlike proportions and a gentle, natural expression.
- If the child is smiling with visible teeth, show a natural full set of child teeth:
  slightly soft and realistic, allowing subtle natural unevenness, but no visible gaps or missing teeth.
- Include the companions in supportive, charming poses that hint at their personalities and connection to the hero.
- Make sure the companions help frame the hero instead of distracting from them.

World & theme:
- Reflect the theme and tone visually (for example: cozy warm lights, sparkles, starry skies, forests, castles,
  superhero cityscapes, dreamy clouds, etc., depending on ${theme} and ${tone}).
- Include 2–4 meaningful objects or visual motifs that hint at the secretWish (e.g. a crown, a backpack, a glowing star,
  a book, a magical item), but keep the cover clean and not overcrowded.
- Use color and lighting to create a strong emotional mood that fits the tone
  (warm and golden for cozy, bold and contrasty for heroic, soft and pastel for dreamy, etc.).

Technical:
- No text anywhere in the image.
- No borders or frames; this should work as a full-bleed book cover illustration.
- Make sure the child's face is clearly visible and recognizable for use across multiple images.
- Keep everything child-friendly, gentle, and whimsical.

Return ONLY the final optimized image generation prompt, with no extra explanation or formatting.
`;

  return { system, user };
};

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


export const generatePageImagePrompt = (config: any) => {
  const {
    characterLook,
    style,
    theme,
    tone,
    characterType,
    companions,
    childAge,
    secretWish,
    imageAltText,
    mainCharacterIncluded
  } = config;

  const system = `
You create consistent illustrations across storybook pages.
Never alter the child's appearance if included.`;

  const CHARACTER_BLOCK = mainCharacterIncluded
    ? `Include the child EXACTLY following: ${characterLook}`
    : `Do NOT include the child. Focus only on environment and companions.`

  const user = `
Create a PAGE illustration.

Global:
style: ${style}
theme: ${theme}
tone: ${tone}
characterType: ${characterType}
childAge: ${childAge}
companions: ${companions}
secretWish: ${secretWish}

Page content:
${imageAltText}

Character rule:
${CHARACTER_BLOCK}

Requirements:
- No text.
- Must match the book's global tone + style.
- Return ONLY the optimized prompt.
`;

  return { system, user };
};


export type StoryConfig = {
  heroName: string;
  characterLook?: string;
  style?: string;
  theme: string;
  tone: string;
  characterType: string;
  childAge: number;
  pageCount: number;
  location: string;
  companions: string;
  secretWish: string;
}

export const generateStoryPrompt = (config: any) => {
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
    secretWish,
  } = config;

  const system = `
You are a professional children's storybook author.
Write warm, magical stories tailored for kids.

IMPORTANT RULE:
- The main character should NOT appear on every page.
- Naturally decide which pages include the child.
- Usually 40–60% of pages include the hero (e.g., 3 of 6 pages).
- Pages without the hero should focus on the world, magic, setting, companions, or events happening elsewhere.
`;

  const characterLookLine = characterLook
    ? `characterLook: ${characterLook}`
    : `/* no characterLook provided */`;

  const user = `
Create a children's storybook.

Variables:
heroName: ${heroName}
${characterLookLine}
style: ${style}
theme: ${theme}
tone: ${tone}
characterType: ${characterType}
age: ${childAge}
pageCount: ${pageCount}
location: ${location}
companions: ${companions}
secretWish: ${secretWish}

RULES FOR PAGE GENERATION:
- The hero should appear on only some pages, not all.
- When the hero is included, set "mainCharacterIncluded": true.
- When the hero is NOT included, set "mainCharacterIncluded": false.
- Pages without the hero should still contribute meaningfully to the narrative (e.g., describe the environment, magic happening elsewhere, companions exploring, a problem emerging, etc.).
- Story should still stay cohesive even when the hero is off-page.

Return JSON:
{
  "title": "...",
  "author": "${heroName} & AI Storymaker",
  "coverImageAlt": "...",
  "pages": [
    {
      "imageAltText": "...",
      "text": "...",
      "mainCharacterIncluded": true or false
    }
  ]
}
`;

  return { system, user };
};





