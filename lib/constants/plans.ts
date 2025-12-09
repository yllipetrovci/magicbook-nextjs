export const plans: any[] = [
    {
        id: 'free',
        title: 'Starter',
        price: 'Free',
        subtitle: '3 Pages',
        credits: 3,
        features: [
            '3 Page Story',
            'Standard Illustrations',
            'Web View Only'
        ],
        buttonText: 'Start Creating',
        colorTheme: 'dark',
        isSubscription: false,
        badge: undefined
    },
    {
        id: 'unlimited',
        title: 'Family Pack',
        price: 29.99,
        credits: 25,
        isSubscription: false,
        billingText: 'Unlimited',
        features: [
            'Unlimited Stories',
            'Unlimited HD Illustrations',
            'Commercial Rights',
            'Access to New Themes'
        ],
        buttonText: 'Start Creating',
        colorTheme: 'purple',
        isPopular: true,
        savingsText: 'SAVE 40% VS BUYING INDIVIDUALLY'
    },
    {
        id: 'credits',
        title: 'Creator',
        price: 19.99,
        credits: 15,
        subtitle: '10 Credits',
        features: [
            '10 Magical Stories',
            'Keep them forever',
            'Printable PDF',
            'No Expiration'
        ],
        buttonText: 'Start Creating',
        isSubscription: false,
        colorTheme: 'dark',
        badge: undefined // Removed "CREDIT PACK" badge to match screenshot cleaner look, or we can keep it. Screenshot shows standard dark card.
    }
];