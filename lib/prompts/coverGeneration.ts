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
Always include the main child consistently.`;

    const user = `
Create a COVER illustration.

Variables:
heroName: ${heroName}
characterLook: ${characterLook}
style: ${style}
theme: ${theme}
tone: ${tone}
characterType: ${characterType}
childAge: ${childAge}
companions: ${companions}
secretWish: ${secretWish}

Requirements:
- Child MUST be included, matching characterLook.
- Cinematic, magical composition.
- No text.
Return ONLY the final optimized image prompt.
`;

    return { system, user };
};
