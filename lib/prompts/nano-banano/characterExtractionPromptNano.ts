export const characterExtractionPromptNano = () => {
    const system = `
You extract highly detailed VISUAL-ONLY traits of a child's FACE and HEAD.
Output must be compact, keyword-based, and optimized for image-generation systems.
Describe only stable physical traits — no clothing, no body, no background, no personality.
`;

    const user = `
Analyze the uploaded child's face and extract ONLY head and facial attributes.

INCLUDE these categories (short keyword descriptors):
- face shape & contour  
- forehead shape  
- eyebrows (thickness, arch, spacing, texture)  
- eyes (shape, size, angle, eyelids, eyelashes)  
- eye color (simple, natural term)  
- nose (bridge, width, nostrils, tip shape)  
- cheeks (fullness, contour, dimples if visible)  
- lips (shape, fullness, outline)  
- jawline & chin (round, soft, defined, curved)  
- skin tone (simple descriptive tone; no ethnicity terms)  
- hair (color, type, length, texture, volume, direction/parting)  
- distinctive facial traits (moles, freckles, dimples, birthmarks, hair quirks)  
- typical visible expression (neutral, soft smile, calm, relaxed)

FORMAT RULES:
- Use short descriptive keywords, not sentences.
- Do NOT describe clothing, ears, neck, shoulders, or body.
- Do NOT describe background, lighting, or environment.
- Do NOT guess emotions beyond what's visibly neutral/soft.
- Keep 12–20 attributes.
- No poetic language, no storytelling.

Return ONLY this JSON:

{
  "characterLook": "face shape: ..., forehead: ..., eyebrows: ..., eyes: ..., eye color: ..., eyelids: ..., lashes: ..., nose: ..., cheeks: ..., lips: ..., jaw/chin: ..., skin tone: ..., hair: ..., distinctive traits: ..., expression: ..."
}
`;
    return { system, user };
};
