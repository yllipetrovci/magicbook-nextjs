export const animationStylesPrompt = {
    wave: { prompt: "wave" },
    hug: { prompt: "hug" },
    nod: { prompt: "nod" },
    smile: { prompt: "smile" },
    gaze: { prompt: "gaze" },
    glance: { prompt: "glance" },
} as const;


export type AnimationStyle = keyof typeof animationStylesPrompt;

