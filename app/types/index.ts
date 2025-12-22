export interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    // Firestore fields
    credits?: number;
    plan?: string;
    createdAt?: string;
}


export interface GenerationResult {
    id: string;
    prompt: string;
    output: string;
    date: Date;
    model: string;
}

export enum SubscriptionTier {
    FREE = 'free',
    PRO = 'pro',
}

export interface PricingPlan {
    id: SubscriptionTier;
    name: string;
    price: number;
    features: string[];
    stripePriceId: string;
}


export interface StoryResponse {
    title: string;
    author: string;
    coverImageAlt: string;
    pages: {
        imageAltText: string;
        text: string;
        mainCharacterIncluded: boolean;
    }[];
}


export enum VoiceStyle {
    NARRATOR = 'narrator',
    GRANDMA = 'grandma',
    WIZARD = 'wizard',
    PIXIE = 'pixie'
}

export enum ReadingStyle {
    MODERN = 'modern',     // Image Top, Text Bottom
    CINEMATIC = 'cinematic', // Full image, Text Overlay (Glass Card)
    SPLIT = 'split',        // Image Left, Text Right (Desktop)
    MINIMAL = 'minimal',    // Clean Canvas (Image Top, Text floats on page)
    OVERLAY = 'overlay'     // Immersive Overlay (Text floats on bottom of full-page image)
}



//MAGIC BOOK





export enum AppStep {
    LANDING,
    HERO_SELECTION,
    ADVENTURE_SELECTION,
    DETAILS_INPUT,
    GENERATING,
    PREVIEW,
    PRICING,
    CHECKOUT,
    SUCCESS
}

export interface User {
    name: string;
    email: string;
    avatar?: string;
    credits: number;
}

export interface StoryConfig {
    heroName: string;
    heroImage?: string | null; // Data URL or Avatar ID
    heroImageOriginal?: string | null; // Original uploaded image
    isAvatar: boolean;
    gender?: 'boy' | 'girl' | '';
    archetype?: 'hero' | 'royal';
    childAge?: number;
    customPageCount?: number;
    tone?: string;
    theme: string;
    place: string;
    color: string;
    companions: string;
    superPower: string;
    secretWish: string;
    email?: string;
    planType?: 'free' | 'paid';
    coverBorder?: string;
    parentRelationship?: string;
    includeParent?: boolean;
    parentImage?: string | null;
    parentImageOriginal?: string | null; // Original uploaded image
    dedicationMessage?: string;
}

export interface GeneratedPage {
    text: string;
    imageDescription?: string;
    image?: string; // Direct URL for dummy/pre-generated stories
}

export enum StoryStatus {
    COMPLETED = 'completed',
    PENDING = 'pending',
    PROCESSING = 'processing',
    FAILED = 'failed',
}

export interface GeneratedStory {
    id?: string;
    title: string;
    author?: string;
    pages: GeneratedPage[];
    date?: string;
    formattedDate?: string;
    coverImage?: string;
    heroName?: string;
    status?: StoryStatus;
}

export interface GeneratedVideo {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    date: string;
    formattedDate?: string;
    duration: string;
}

export interface GeneratedImage {
    id: string;
    title: string;
    imageUrl: string;
    date: string;
    prompt: string;
    formattedDate?: string;
}

export const DEFAULT_CONFIG: StoryConfig = {
    heroName: '',
    isAvatar: true,
    theme: '',
    place: '',
    color: '',
    companions: '',
    superPower: '',
    secretWish: '',
    email: '',
    planType: 'paid',
    archetype: 'hero',
    tone: 'Magical Sparkle',
    childAge: 5,
    customPageCount: 6,
    parentRelationship: '',
    includeParent: false,
    parentImage: null,
    dedicationMessage: '',
    gender: '',
    heroImage: null,
    heroImageOriginal: null,
    parentImageOriginal: null
};

export interface Plan {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    features: string[];
    isPopular?: boolean;
    color: 'purple' | 'orange' | 'blue';
}


// --- QUEST / STORY MAP TYPES ---
export interface QuestChapter {
    id: number;
    day: number;
    title: string;
    description: string;
    status: 'completed' | 'unlocked' | 'locked';
    thumbnail: string;
    position: { x: number; y: number }; // Percentage coordinates for the map
    storyData?: GeneratedStory; // The actual content
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    theme: 'christmas' | 'space' | 'jungle';
    totalChapters: number;
    currentChapter: number;
    chapters: QuestChapter[];
    backgroundUrl: string;
}

export interface User {
    name: string;
    email: string;
    avatar?: string;
    credits: number;
}


export type Job = {
    jobId: string
    jobType: 'story' | 'video' | 'coloring'
    status: "queued" | "processing" | "completed" | "failed"
    progress: number
    resultId?: string
}
