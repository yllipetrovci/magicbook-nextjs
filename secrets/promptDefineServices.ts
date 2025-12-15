const characterExtractionPrompt = () => {
    const SYSTEM_PROMPT = `
You are an expert character–descriptor for children’s illustrated storybooks. 
Your job is to extract unique physical and stylistic traits from a child's photo. 
Return a short, clean description focused only on VISUAL traits that can be reused
for consistent character appearance across multiple AI-generated images.

Rules:
- Describe only visual, stable features (face, eyes, hair, skin tone, expression style).
- DO NOT guess personality, age beyond approximate range, or emotions not visible.
- Keep descriptions 70–80% faithful to the child.
- Make it suitable for children's illustration prompts (soft, kind tone).
- Keep the description short (4–7 lines).
`;

    const USER_PROMPT = `
Extract the unique visual characteristics of the child in this uploaded image.
Return a concise, reusable character description I can include in future prompts.

Return ONLY the following JSON:

{
  "characterLook": "A short, accurate visual description of the child focusing on face shape, eyes, eyebrows, hair, skin tone, typical expression, and any distinctive traits."
}
`;

    return { system: SYSTEM_PROMPT, user: USER_PROMPT };
};


const generateStoryBookUsingAllConfigs = ({
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
}: any) => {

    const SYSTEM_PROMPT = `
You are a professional children's storybook author and illustrator. 
Create imaginative, emotionally warm, child-appropriate stories with a clear beginning,
adventure, and resolution. Every page should feel magical and meaningful.

Follow ALL rules carefully:
- Write for the child's exact age level.
- Integrate the story tone strongly (cozy, sparkly, heroic, etc.).
- Use the theme and style consistently through the narrative.
- Incorporate the secretWish gently into the story arc.
- Include the companions as recurring, helpful characters.
- Each page should describe one moment of the story.
- Keep language simple, melodic, emotional, and visually rich.
`;

    const USER_PROMPT = `
Create a children's storybook using these variables:

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

Rules:
- The main character must appear on most pages.
- Each page must include an emotion, a visual setting, and a story beat.
- Write ALT text describing the illustration for each page (not a prompt for image gen).
- Keep pages short and readable (40–70 words each).
- The story should feel wholesome, magical, and tailored to the child.

Return the story STRICTLY in this JSON format:

{
  "title": "A beautiful, themed title that fits the tone and heroName.",
  "author": "${heroName} & AI Storymaker",
  "coverImageAlt": "A short description of what the cover image should depict, including the characterLook and theme/style.",
  "pages": [
    {
      "imageAltText": "What the illustration on this page should show (include characterLook if character should be visible).",
      "text": "The story text for this page.",
      "mainCharacterIncluded": true or false
    }
  ]
}
`;

    return { system: SYSTEM_PROMPT, user: USER_PROMPT };
};



const generateImageForSpecificPage = ({
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
}: any) => {

    const SYSTEM_PROMPT = `
You are an expert children's storybook illustrator creating consistent illustrations across multiple pages.

Rules:
- ONLY include the child character if instructed.
- If the child appears, ALWAYS keep them consistent using characterLook.
- Maintain the same artistic style, lighting, tone, and color palette across all pages.
- Avoid aging, altering proportions, or inventing new traits.
- Do not add text inside the image.
- Every page must look like it's illustrated by the same artist.
`;

    // Dynamic injection — only if main character appears
    const CHARACTER_SECTION = mainCharacterIncluded ? `Include the main child character exactly following this description: ${characterLook};

The child must look 70–80% like the real child, with identical face shape, features, and hairstyle.`
        : `Do NOT include the child character in this illustration.
Focus only on the environment, companions (if relevant), and the scene description.`;

    const USER_PROMPT = `
Create a children's storybook illustration for one page.

GLOBAL BOOK SETTINGS:
- style: ${style}
- theme: ${theme}
- tone: ${tone}
- characterType: ${characterType}
- childAge: ${childAge}
- companions: ${companions}
- secretWish: ${secretWish}

PAGE CONTENT:
- Scene description: ${imageAltText}
- mainCharacterIncluded: ${mainCharacterIncluded}

CHARACTER RULE:
${CHARACTER_SECTION}

ILLUSTRATION REQUIREMENTS:
1. Keep the exact same art style, rendering quality, lighting, and palette used across all book pages.
2. If the child is included, follow the characterLook precisely.
3. Reflect the selected tone (cozy, heroic, sparkly, etc.) and theme visually.
4. Make the scene warm, magical, and child-friendly.
5. No text in the image.
6. Return ONLY the final optimized image-generation prompt.
`;

    return { system: SYSTEM_PROMPT, user: USER_PROMPT };
};


const generateCoverImagePrompt = ({
    characterLook,
    style,
    theme,
    tone,
    characterType,
    companions,
    childAge,
    secretWish,
    heroName
}: any) => {

    const SYSTEM_PROMPT = `
You are an expert children's storybook cover illustrator.
Your goal is to create a stunning, emotional, iconic cover that perfectly represents the story's tone, theme, and main character.

Rules:
- ALWAYS include the main child character using the exact characterLook.
- The cover must feel cinematic and emotionally powerful.
- Use lighting, color, and composition that match the chosen style and tone.
- Incorporate visual hints of the theme (superhero, fantasy, royal, christmas, etc.).
- Avoid text in the image.
- Do not drastically change proportions or the child's likeness.
- The cover should look like a professional children's book sold in stores.
`;

    const USER_PROMPT = `
    Create a children's storybook COVER illustration.
        SETTINGS:
        - heroName: ${heroName}
        - characterLook: ${characterLook}
        - style: ${style}
        - theme: ${theme}
        - tone: ${tone}
        - characterType: ${characterType}
        - companions: ${companions}
        - childAge: ${childAge}
        - secretWish: ${secretWish}

        COVER REQUIREMENTS:
        1. Include the main child character prominently, matching characterLook exactly.
        2. Add subtle thematic visual elements that reflect the story's journey:
        - If heroic → strong lighting, dynamic pose, brave expression.
        - If cozy → warm glow, soft textures, calm expression.
        - If sparkly → magical particles, colorful highlights.
        - If royal → elegant patterns, crown motifs, soft gold tones.
        - If fantasy → enchanted forests, glowing elements, whimsical mood.
        3. Composition should feel iconic and instantly recognizable as the story's world.
        4. You may include the main companion in a small supporting role.
        5. No text inside the image.
        6. The illustration must match the tone and aesthetic of the interior pages.

        Return ONLY the optimized image prompt.
        `;

    return { system: SYSTEM_PROMPT, user: USER_PROMPT };
};


const generateThumbnailImagePrompt = ({
    characterLook,
    style,
    theme,
    tone,
    characterType,
    childAge,
    heroName
}: any) => {

    const SYSTEM_PROMPT = `
    You are an expert illustrator who creates SMALL, SIMPLE, ICONIC thumbnails representing the core emotion and theme of a children's story.

    Rules:
    - The thumbnail must be visually simpler and more symbolic than the cover.
    - Include the child character ONLY from shoulders-up or waist-up for clarity.
    - Facial expression must match the tone:
    * heroic → determined small smile
    * cozy → soft warm smile
    * sparkly → wonder and awe
    * funny → playful grin
    * fairy → dreamy soft look
    - Background must be simple abstract shapes/colors matching the style.
    - Avoid detailed scenery; thumbnails must remain recognizable even at tiny sizes.
    - No text.
    `;

    const USER_PROMPT = `
    Create a SMALL, ICONIC thumbnail illustration.

    SETTINGS:
    - heroName: ${heroName}
    - characterLook: ${characterLook}
    - style: ${style}
    - theme: ${theme}
    - tone: ${tone}
    - characterType: ${characterType}
    - childAge: ${childAge}

    THUMBNAIL REQUIREMENTS:
    1. Show the child's face and upper body using characterLook consistently.
    2. Background must be a simple themed abstract (sparkles, forest glow, heroic beams, royal gold, etc.).
    3. Emotion must match the story tone.
    4. Keep the illustration readable at very small sizes.
    5. No text.
    6. Return ONLY the final image-generation prompt.
`;

    return { system: SYSTEM_PROMPT, user: USER_PROMPT };
};



