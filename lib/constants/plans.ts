export const plans: any[] = [
    {
        id: 'free',
        title: 'Free - Explorer',
        price: 'Free',
        subtitle: '6 Credits',
        credits: 6,
        features: [
            'Create 1 short story',
            'Basic illustrations(standard style)',
            'Limited customization(character name + theme)',
            'Web reading only(no download)',
            'Watermark on pages',
            'Relax Mode: Slower generation during peak times',
        ],
        buttonText: 'Start Explore',
        colorTheme: 'dark',
        isSubscription: false,
        badge: undefined
    },
    {
        id: 'credits',
        title: 'Creator',
        priceId: 'pri_01kd4a2gh26e41gjngberydqbz',  
        features: [
            '10–12 long stories (8–10 pages)',
            'Premium illustration styles',
            'Long-form stories',
            'Full character control',
            'PDF + print-ready',
            'Optional commercial use',
            'Turbo Mode:Priority processing (near-instant)',
        ],
        buttonText: 'Start Creating',
        isSubscription: true,
        colorTheme: 'purple',
        savingsText: 'SAVE 40% VS BUYING INDIVIDUALLY',
        isPopular: true,
        badge: undefined // Removed "CREDIT PACK" badge to match screenshot cleaner look, or we can keep it. Screenshot shows standard dark card.
    },

    {
        id: 'Starter_Dreamer',
        title: 'Starter – Dreamer',
        isSubscription: true,
        colorTheme: 'dark',
        priceId: "pri_01kd4a5ze9e598p55nd1p2ejr3",
        features: [ // will be depricated
            '4–5 medium stories (8–10 pages each)',
            'Multiple illustration styles',
            'Tone selection (funny, calm, bedtime)',
            'PDF download',
            'No watermark',
            'Fast Mode: Faster generation',

        ],
        buttonText: 'Start Dream',

    },
];



export const upsellBook = {
    id: 'upsell_video',
    title: 'Video Upgrade',
    price: 14.99,
    originalPrice: 29.99,
    features: [
        'Animated Story Video',
        'Professional Narration',
        'Background Music',
        'Perfect for Sharing'
    ],
}

export const upsellVideo = {
    id: 'upsell_video',
    title: 'Video Upgrade',
    price: 7.99,
    originalPrice: 39.95,
    features: [
        'Animated Story Video',
        'Professional Narration',
        'Background Music',
        'Perfect for Sharing'
    ],
}

export const upsellDaily = {
    id: 'upsell_daily',
    title: 'Daily Stories',
    price: 0.59,
}
