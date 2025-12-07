// Helper to get a relevant cover image based on the theme name string
export const getCoverImage = (theme: string) => {
    const t = (theme || '').toLowerCase();
    if (t.includes('santa') || t.includes('christmas')) return 'https://image.pollinations.ai/prompt/christmas%20book%20cover%20santa%20workshop%20pixar%20style?width=400&height=600&nologo=true';
    if (t.includes('comic') || t.includes('super')) return 'https://image.pollinations.ai/prompt/comic%20book%20cover%20superhero%20kid%20action%20pose?width=400&height=600&nologo=true';
    if (t.includes('fantasy') || t.includes('magic')) return 'https://image.pollinations.ai/prompt/fantasy%20book%20cover%20dragon%20castle%20pixar%20style?width=400&height=600&nologo=true';
    if (t.includes('space') || t.includes('star')) return 'https://image.pollinations.ai/prompt/space%20adventure%20book%20cover%20astronaut%20planets?width=400&height=600&nologo=true';
    if (t.includes('princess') || t.includes('royal')) return 'https://image.pollinations.ai/prompt/princess%20book%20cover%20castle%20sparkles?width=400&height=600&nologo=true';
    if (t.includes('dinosaur') || t.includes('dino')) return 'https://image.pollinations.ai/prompt/dinosaur%20adventure%20book%20cover%20cute%20pixar?width=400&height=600&nologo=true';
    if (t.includes('epic')) return 'https://image.pollinations.ai/prompt/epic%20adventure%20book%20cover%20mountain%20journey?width=400&height=600&nologo=true';
    return 'https://image.pollinations.ai/prompt/magical%20storybook%20cover%20generic%20fantasy?width=400&height=600&nologo=true';
};

// Helper to get border CSS class based on the selected style
export const getBorderClass = (styleLabel: string) => {
    const style = (styleLabel || '').toLowerCase();
    if (style.includes('fantasy')) return 'border-double border-yellow-500';
    if (style.includes('royal')) return 'border-solid border-pink-400';
    if (style.includes('minimal')) return 'border-solid border-white';
    if (style.includes('watercolor')) return 'border-dashed border-teal-300';
    if (style.includes('comic')) return 'border-solid border-yellow-300';
    if (style.includes('cozy')) return 'border-dotted border-orange-300';
    if (style.includes('3d')) return 'border-solid border-blue-400';
    if (style.includes('vintage')) return 'border-double border-amber-700';
    if (style.includes('sparkly')) return 'border-dashed border-purple-400';
    if (style.includes('anime')) return 'border-solid border-indigo-400';
    if (style.includes('pixel')) return 'border-dashed border-green-400';
    if (style.includes('clay')) return 'border-dotted border-red-400';
    return 'border-solid border-white';
};
