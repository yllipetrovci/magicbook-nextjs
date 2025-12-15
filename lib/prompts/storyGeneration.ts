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

