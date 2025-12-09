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
