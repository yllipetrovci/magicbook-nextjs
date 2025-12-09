export const generateThumbnailImagePrompt = (config: any) => {
    const {
        characterLook,
        style,
        theme,
        tone,
        characterType,
        childAge,
        heroName
    } = config;

    const system = `
You create small, iconic thumbnails for storybooks.
Simple, emotional, instantly readable.`;

    const user = `
Create a THUMBNAIL ICON.

Settings:
heroName: ${heroName}
characterLook: ${characterLook}
style: ${style}
tone: ${tone}
theme: ${theme}
characterType: ${characterType}
childAge: ${childAge}

Requirements:
- Shoulders-up or waist-up portrait.
- Expression must reflect tone.
- Simple abstract background.
- No text.
Return ONLY the final prompt.
`;

    return { system, user };
};
