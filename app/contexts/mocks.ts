import { GeneratedImage, GeneratedStory, GeneratedVideo } from "../types";

export const MOCK_STORY: GeneratedStory = {
    title: "The Magic Forest Adventure",
    heroName: "Arthur",
    pages: [
        { text: "Once upon a time, in a land filled with sparkling leaves, a brave explorer entered the Magic Forest.", imageDescription: "A magical forest with glowing trees and fireflies, pixar style" },
        { text: "Suddenly, a friendly blue dragon flew down from the sky. 'Hello!' said the dragon, 'Do you want to fly?'", imageDescription: "A cute blue dragon landing near a child in a forest, pixar style" },
        { text: "They soared high above the clouds, chasing rainbows and laughing all the way to the moon.", imageDescription: "A child riding a dragon in the sky near a rainbow, pixar style" },
        { text: "It was the best adventure ever. They promised to meet again the very next day.", imageDescription: "Child hugging the dragon goodbye at sunset, pixar style" }
    ],
    date: new Date().toISOString(),
    coverImage: "https://image.pollinations.ai/prompt/cute%20dragon%20forest%20pixar%20style?width=600&height=400&nologo=true"
};

export const MOCK_VIDEO: GeneratedVideo = {
    id: 'v1',
    title: "The Dragon's Flight",
    thumbnail: "https://image.pollinations.ai/prompt/cute%203d%20cartoon%20boy%20riding%20flying%20dragon%20cinematic%20lighting%20pixar%20style?width=600&height=400&nologo=true",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    date: new Date().toISOString(),
    duration: "2:15"
};

export const MOCK_IMAGE: GeneratedImage = {
    id: 'i1',
    title: "A Cute Unicorn",
    imageUrl: "https://image.pollinations.ai/prompt/coloring%20book%20page%20cute%20unicorn%20line%20art%20black%20and%20white%20white%20background%20simple%20outlines%20kids%20drawing?width=600&height=600&nologo=true",
    date: new Date().toISOString(),
    prompt: "A cute unicorn jumping over a rainbow"
};