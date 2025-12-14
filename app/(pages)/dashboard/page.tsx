
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { StoryCard } from './components/StoryCard';
import { DashboardSection } from './components/DashboardSection';
import { GeneratedStory } from '@/app/types';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const DashboardPage: React.FC = () => {
    const router = useRouter();
    const user = { credits: 5 }; // Mock user credits
    const { config } = useStory();
    const stories: GeneratedStory [] = [] as any; // Mock stories

    const { t } = useLanguage();
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    const latestHeroName = stories?.length > 0 && stories[0].heroName
        ? stories[0].heroName
        : (config.heroName || "Little Hero");

    const handleCreateNew = () => {
        if (user && user.credits > 0) {
            router.push('/hero');
        } else {
            router.push('/dashboard/credits');
        }
    };

    const handleReadStory = (story: GeneratedStory) => {
        // setGeneratedStory(story);
        router.push('/read');
    };

    const handleDownloadPdf = (e: React.MouseEvent, index: number, story: GeneratedStory) => {
        e.stopPropagation();
        setDownloadingId(index);

        // Simulate PDF generation download time
        setTimeout(() => {
            setDownloadingId(null);
            alert(`"${story.title}" (Hero: ${story.heroName}) has been downloaded! (Mock Action)`);
        }, 2000);
    };

    return (
        <>
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-magic-card/30 p-6 rounded-3xl border border-white/5 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1 drop-shadow-lg flex items-center gap-2">
                        My Library <i className="fa-solid fa-book-open-reader text-magic-purple ml-2"></i>
                    </h1>
                    <p className="text-gray-400 text-sm font-bold">
                        Welcome back, <span className="text-magic-orange">{latestHeroName}</span>!
                    </p>
                </div>

                {/* Mobile Credit Display */}
                <div className="md:hidden flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10">
                    <span className="text-yellow-400 font-bold">{user?.credits} Credits</span>
                    <button onClick={() => router.push('/dashboard/credits')} className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs"><i className="fa-solid fa-plus"></i></button>
                </div>

                <Button onClick={handleCreateNew} size="md" className="shadow-lg shadow-purple-500/20">
                    Create Story <i className="fa-solid fa-wand-magic-sparkles ml-2"></i>
                </Button>
            </div>

            <DashboardSection
                title={t('dash_library')}
                icon="fa-book-open-reader"
                iconColor="text-magic-purple"
                count={stories.length}
                countLabel="stories"
                badgeColor="text-green-400"
                dotColor="bg-green-500"
                items={stories}
                onCreate={handleCreateNew}
                emptyState={{
                    icon: 'fa-box-open',
                    message: t('dash_no_stories'),
                    buttonLabel: t('dash_create_new'),
                    buttonIcon: 'fa-wand-magic-sparkles'
                }}
                createCard={{
                    title: t('dash_create_new'),
                    subtext: "1 Credit",
                    icon: "fa-plus",
                    theme: "purple"
                }}
                renderItem={(story, index) => (
                    <StoryCard
                        key={index}
                        story={story || {}}
                        onRead={() => handleReadStory(story)}
                        onDownload={(e) => handleDownloadPdf(e, index, story)}
                        onDelete={(e) => {
                            e.stopPropagation();
                            // deleteStory(index);
                        }}
                        isDownloading={downloadingId === index}
                    />
                )}
            />
        </>
    );
};

export default DashboardPage;
