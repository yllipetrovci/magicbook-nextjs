
'use client'
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { QuestChapter } from '@/app/types';

// --- DATA & CONFIG ---

const CHRISTMAS_QUEST_CHAPTERS: QuestChapter[] = [
    {
        id: 1,
        day: 1,
        title: "The Empty Stable",
        description: "Discovering the mystery at the North Pole.",
        status: 'completed',
        thumbnail: "https://image.pollinations.ai/prompt/empty%20reindeer%20stable%20north%20pole%20snow%20pixar%20style?width=400&height=300&nologo=true",
        position: { x: 0, y: 0 }
    },
    {
        id: 2,
        day: 2,
        title: "The Glowing Tracks",
        description: "Following magical footprints in the snow.",
        status: 'completed',
        thumbnail: "https://image.pollinations.ai/prompt/glowing%20hoof%20prints%20in%20snow%20magical%20forest%20pixar%20style?width=400&height=300&nologo=true",
        position: { x: 0, y: 0 }
    },
    {
        id: 3,
        day: 3,
        title: "The Whispering Pine",
        description: "Meeting the ancient tree spirit.",
        status: 'unlocked', // ACTIVE
        thumbnail: "https://image.pollinations.ai/prompt/ancient%20talking%20pine%20tree%20face%20snow%20pixar%20style?width=400&height=300&nologo=true",
        position: { x: 0, y: 0 }
    },
    {
        id: 4,
        day: 4,
        title: "The Frozen Lake",
        description: "A slippery challenge awaits.",
        status: 'locked',
        thumbnail: "https://image.pollinations.ai/prompt/frozen%20lake%20ice%20skating%20penguins%20pixar%20style?width=400&height=300&nologo=true",
        position: { x: 0, y: 0 }
    },
    {
        id: 5,
        day: 5,
        title: "Santa's Reunion",
        description: "The grand finale!",
        status: 'locked',
        thumbnail: "https://image.pollinations.ai/prompt/santa%20hugging%20reindeer%20happy%20ending%20christmas%20pixar%20style?width=400&height=300&nologo=true",
        position: { x: 0, y: 0 }
    }
];

// Snow Animation Component
const Snowfall = () => {
    const flakes = useMemo(
        () =>
            Array.from({ length: 30 }, () => ({
                top: -Math.random() * 20,
                left: Math.random() * 100,
                size: Math.random() * 4 + 2,
                duration: Math.random() * 10 + 15,
                delay: Math.random() * 5,
            })),
        []
    );

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {flakes.map((flake, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full opacity-40 animate-float"
                    style={{
                        top: `${flake.top}%`,
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animationDuration: `${flake.duration}s`,
                        animationDelay: `${flake.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

const QuestMap: React.FC = () => {
    const router = useRouter();
    const { config } = useStory();//setGeneratedStory,

    const setGeneratedStory = (item: any) => {

    }

    const handleChapterClick = (chapter: QuestChapter) => {
        if (chapter.status === 'locked') return;

        // Simulate loading story data
        const storyData = {
            title: chapter.title,
            heroName: config.heroName || "The Hero",
            coverImage: chapter.thumbnail,
            pages: [
                { text: `Chapter ${chapter.day}: ${chapter.title}`, image: chapter.thumbnail },
                { text: "The snow crunched beneath their boots as they ventured deeper...", image: chapter.thumbnail },
                { text: "Suddenly, a magical sparkle appeared in the distance!", image: chapter.thumbnail },
                { text: "To be continued...", image: chapter.thumbnail }
            ],
            date: new Date().toISOString()
        };
        setGeneratedStory(storyData);
        router.push('/read');
    };

    return (
        <div className="min-h-screen bg-[#0B0C15] relative overflow-x-hidden w-full flex flex-col items-center">

            {/* Background Gradient & Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-black z-0"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-0 mix-blend-overlay"></div>
            <Snowfall />

            {/* Header */}
            <div className="sticky top-0 z-50 w-full bg-[#0B0C15]/80 backdrop-blur-md border-b border-white/5 shadow-xl">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white pl-0">
                        <i className="fa-solid fa-arrow-left mr-2"></i> Dashboard
                    </Button>
                    <div className="flex flex-col items-end">
                        <h2 className="text-white font-black text-lg drop-shadow-md">The Lost Reindeer</h2>
                        <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                            <i className="fa-solid fa-star"></i>
                            <span>6/15 Stars Collected</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CALENDAR GRID AREA --- */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg font-serif">Your Christmas Journey</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Unlock a new magical chapter every day to find Santa's missing reindeer!</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CHRISTMAS_QUEST_CHAPTERS.map((chapter) => {
                        const isLocked = chapter.status === 'locked';
                        const isCompleted = chapter.status === 'completed';
                        const isActive = chapter.status === 'unlocked';

                        return (
                            <div
                                key={chapter.id}
                                onClick={() => handleChapterClick(chapter)}
                                className={`
                                relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group
                                ${isLocked ? 'cursor-not-allowed opacity-80 scale-95' : 'cursor-pointer hover:scale-[1.02] hover:-translate-y-2'}
                                ${isActive ? 'ring-4 ring-magic-purple/50 shadow-purple-500/30' : 'border border-white/5'}
                            `}
                            >
                                {/* Card Image */}
                                <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                                    <img
                                        src={chapter.thumbnail}
                                        alt={chapter.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${isLocked ? 'grayscale opacity-50' : 'group-hover:scale-110'}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                                    {/* Day Badge */}
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg ${isActive ? 'bg-magic-orange text-white' : 'bg-black/60 text-gray-300 backdrop-blur-md'}`}>
                                        Day {chapter.day}
                                    </div>

                                    {/* Status Icon */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        {isLocked && <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10"><i className="fa-solid fa-lock text-3xl text-gray-400"></i></div>}
                                        {isActive && <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/50 animate-pulse"><i className="fa-solid fa-play text-3xl text-white pl-1"></i></div>}
                                        {isCompleted && <div className="w-16 h-16 bg-green-500/80 rounded-full flex items-center justify-center backdrop-blur-md border border-green-400 shadow-lg shadow-green-500/20"><i className="fa-solid fa-check text-3xl text-white"></i></div>}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="bg-magic-card p-6 relative">
                                    <h3 className={`text-xl font-black mb-2 leading-tight ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                                        {chapter.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                                        {chapter.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        {isCompleted ? (
                                            <span className="text-xs font-bold text-green-400 flex items-center gap-2">
                                                <i className="fa-solid fa-book-open"></i> Read Again
                                            </span>
                                        ) : isActive ? (
                                            <span className="text-xs font-bold text-magic-orange flex items-center gap-2 animate-pulse">
                                                <i className="fa-solid fa-star"></i> Ready to Start!
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                                                <i className="fa-solid fa-clock"></i> Coming Soon
                                            </span>
                                        )}

                                        {/* Star Rating Placeholder */}
                                        {isCompleted && (
                                            <div className="flex gap-1 text-yellow-400 text-xs">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default QuestMap;
