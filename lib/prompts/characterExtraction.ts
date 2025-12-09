export const characterExtractionPrompt = () => {
    const system = `
You are an expert character–descriptor for children’s illustrated storybooks.
Return only unique visual traits that ensure consistent character illustrations.`;

    const user = `
Extract the child's unique visual characteristics from the uploaded image.

Return ONLY:
{
  "characterLook": "short visual description"
}
`;

    return { system, user };
};
