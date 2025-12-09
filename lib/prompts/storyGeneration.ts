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
Write warm, magical stories tailored for kids.`;

    const user = `
Create a children's storybook.

Variables:
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

Return JSON:
{
  "title": "...",
  "author": "${heroName} & AI Storymaker",
  "coverImageAlt": "...",
  "pages": [
    {
      "imageAltText": "...",
      "text": "...",
      "mainCharacterIncluded": true/false
    }
  ]
}
`;

    return { system, user };
};
