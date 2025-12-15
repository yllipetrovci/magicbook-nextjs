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