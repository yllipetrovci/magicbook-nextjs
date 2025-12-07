

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StoryConfig, GeneratedStory } from "../types";
import { Language } from "../utils/translations";

export const generateMagicStory = async (config: StoryConfig, language: Language): Promise<GeneratedStory> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const languageMap: Record<Language, string> = {
    en: "English",
    sq: "Albanian",
    de: "German",
    es: "Spanish",
    jp: "Japanese",
    zh: "Chinese (Simplified)"
  };

  const targetLang = languageMap[language] || "English";

  // Use custom page count if set, otherwise fallback to email logic
  // If email is provided (free user flow), cap at 3 unless custom count is explicitly lower
  // But generally, we respect the customPageCount if it exists in the config
  const pageCount = config.customPageCount || (config.email ? 3 : 6);

  const parentContext = config.includeParent && config.parentRelationship 
    ? `- Companion/Guide: The hero's ${config.parentRelationship} is included in the adventure as a supportive sidekick or guide.` 
    : '';

  const ageContext = config.childAge 
    ? `- Target Audience Age: ${config.childAge} years old (Adjust vocabulary and tone accordingly)` 
    : '- Target Audience: Children (5-8 years old)';

  const prompt = `
    Write a children's fairytale story (exactly ${pageCount} pages/scenes) in ${targetLang} based on the following details:
    - Hero Name: ${config.heroName}
    - Gender: ${config.gender || 'Not specified'}
    - Age Group: ${config.childAge || 5} years old
    - Archetype: ${config.archetype || 'Hero'}
    - Tone: ${config.tone || 'Magical Sparkle'}
    - Theme: ${config.theme}
    - Magical Place: ${config.place}
    - Favorite Color: ${config.color}
    - Companions: ${config.companions}
    - Super Power: ${config.superPower}
    - Secret Wish: ${config.secretWish}
    - Cover Border Style: ${config.coverBorder || 'Classic'}
    ${parentContext}
    ${ageContext}

    The story should be engaging, magical, and appropriate for the specified age.
    It should be structured into ${pageCount} distinct pages/scenes.
    For each page, provide the text content in ${targetLang} and a detailed visual description for an illustration that would go with it (image description should be in English for the image generator).
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: `The magical title of the story in ${targetLang}` },
      pages: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: `The story text for this page in ${targetLang} (approx 2-3 sentences)` },
            imageDescription: { type: Type.STRING, description: "A prompt to generate an image for this page (Keep this in English)" }
          },
          required: ["text", "imageDescription"]
        }
      }
    },
    required: ["title", "pages"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: `You are a world-class children's book author writing in ${targetLang}. You write with whimsy, warmth, and excitement.`,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedStory;
    } else {
      throw new Error("No content generated");
    }
  } catch (error) {
    console.error("Gemini generation failed:", error);
    // Fallback for demo purposes if API fails or quota exceeded
    return {
      title: `The Magical Adventures of ${config.heroName}`,
      pages: [
        { text: `Once upon a time, ${config.heroName} discovered a hidden path near their home.`, imageDescription: "A child finding a glowing path in a forest" },
        { text: `The path led to ${config.place}, a world filled with ${config.color} light!`, imageDescription: `A magical landscape colored in ${config.color}` },
        { text: `Suddenly, ${config.heroName} met ${config.companions}. They became fast friends.`, imageDescription: "The hero meeting magical creatures" },
        { text: `Using the power of ${config.superPower}, they solved a great mystery.`, imageDescription: "The hero using magic powers" },
        { text: `Finally, ${config.heroName}'s wish to ${config.secretWish} came true!`, imageDescription: "A celebratory magical moment" },
        { text: "It was the best adventure ever. The End.", imageDescription: "The hero sleeping peacefully or waving goodbye" }
      ].slice(0, pageCount) // Respect page count in fallback
    };
  }
};