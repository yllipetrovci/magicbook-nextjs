export const pageImageGenerationNano = (config: any) => {
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
        mainCharacterIncluded,
    } = config;

    const system = `
You generate clean, consistent, full-bleed illustrations for children's storybooks.
Never alter the child's appearance if included.
Absolutely no borders, margins, frames, book layouts, or mockup-like presentation.
Produce pure standalone artwork that fills the entire canvas edge-to-edge.
`;

    const CHARACTER_BLOCK = mainCharacterIncluded
        ? `CHARACTER:
- Include the child exactly as described.
- ${characterLook}
- Keep identical facial features, hair, proportions, and visual identity across all images.`
        : `CHARACTER:
- Do NOT include the child.
- Focus only on environment, atmosphere, companions, and magical elements.`;

    const user = `
Create a single FULL-BLEED illustration.

CANVAS:
- A4 vertical aspect ratio (1:1.41)
- Full-bleed artwork (corner-to-corner, no empty space)
- High-definition target (~1024×1440)
- No borders, no margins, no framing, no padding of any kind.

STYLE:
- ${style}, ${theme}, ${tone}, ${characterType}
- Child age reference (if included): ${childAge}

SCENE:
${imageAltText}

${CHARACTER_BLOCK}

COMPANIONS:
${companions}

MAGIC ELEMENT:
${secretWish}

ABSOLUTE RULES:
- No text anywhere.
- No books, pages, open books, printed layouts, document-like backgrounds, or mockups.
- No borders, margins, white padding, rounded corners, or negative space.
- No watermarks, signatures, or UI elements.
- No multi-panel or collage effects.
- Only ONE single, unified illustration that fills the entire frame.

OUTPUT:
Return ONLY the optimized final prompt for generating this illustration.
`;

    return { system, user };
};
