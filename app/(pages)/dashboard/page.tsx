
'use client';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/Button';
import { StoryCard } from './components/StoryCard';
import { DashboardSection } from './components/DashboardSection';
import { GeneratedStory } from '@/app/types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { DASHBOARD_PATHS, PATHS } from '@/app/constants/relativeRoutePaths';

export const DashboardPage: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { config, stories, storiesLoaded, setStories } = useStory();

    const { t } = useLanguage();
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
    const [storyToDelete, setStoryToDelete] = useState<GeneratedStory | null>(null);

    const latestHeroName = stories?.length > 0 && stories[0].heroName
        ? stories[0].heroName
        : (config.heroName || "Little Hero");

    const handleCreateNew = () => {
        if (user && user.credits && user.credits > 0) {
            router.push('/hero');
        } else {
            router.push('/dashboard/credits');
        }
    };

    const handleReadStory = (story: GeneratedStory) => {
        // setGeneratedStory(story);
        router.push(PATHS.READ_STORY);
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

    const handleDeleteStory = async (story: GeneratedStory) => {
        if (!story.id) return;

        try {
            const res = await fetch(`/api/firebase/stories/${story.id}`, { method: 'DELETE' });
            if (!res.ok) {
                console.error('Failed to delete story:', res.status);
                return;
            }
            setStories(prev => prev.filter(item => item.id !== story.id));
            setStoryToDelete(null);
        } catch (error) {
            console.error('Failed to delete story:', error);
        }
    };

    const isLibraryLoading = !storiesLoaded;
    const placeholderStories = useMemo<(GeneratedStory | null)[]>(() => Array.from({ length: 4 }, () => null), []);
    const itemsToRender: (GeneratedStory | null)[] = isLibraryLoading ? placeholderStories : stories;
    
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
                    <span className="text-yellow-400 font-bold">{user?.credits || 0} Credits</span>
                    <button onClick={() => router.push('/dashboard/credits')} className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs"><i className="fa-solid fa-plus"></i></button>
                </div>

                <Button onClick={handleCreateNew} size="md" variant="transparent" className="shadow-lg shadow-purple-500/20 bg-magic-blue hover:bg-blue-600">
                    Create Story <i className="fa-solid fa-wand-magic-sparkles ml-2"></i>
                </Button>
            </div>

            <DashboardSection<GeneratedStory | null>
                title={t('dash_library')}
                icon="fa-book-open-reader"
                iconColor="text-magic-purple"
                count={storiesLoaded ? stories.length : 0}
                countLabel="stories"
                badgeColor="text-green-400"
                dotColor="bg-green-500"
                items={itemsToRender}
                onCreate={handleCreateNew}
                emptyState={{
                    icon: 'fa-box-open',
                    message: t('dash_no_stories'),
                    buttonLabel: t('dash_create_new'),
                    buttonIcon: 'fa-wand-magic-sparkles'
                }}
                createCard={
                    isLibraryLoading
                        ? undefined
                        : {
                            title: t('dash_create_new'),
                            subtext: "1 Credit",
                            icon: "fa-plus",
                            theme: "purple"
                        }
                }
                renderItem={(story, index) => (
                    <StoryCard
                        key={story?.id ?? `placeholder-${index}`}
                        story={story || undefined}
                        isLoading={isLibraryLoading}
                        onRead={story ? () => handleReadStory(story) : undefined}
                        onDownload={
                            story
                                ? (e) => handleDownloadPdf(e, index, story)
                                : undefined
                        }
                        onDelete={
                            story?.id
                                ? (e) => {
                                    e.stopPropagation();
                                    setStoryToDelete(story);
                                }
                                : undefined
                        }
                        isDownloading={!story ? false : downloadingId === index}
                    />
                )}
            />
            {storyToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-magic-card p-6 shadow-xl">
                        <h3 className="text-xl font-black text-white mb-2">Delete story?</h3>
                        <p className="text-sm text-gray-400 mb-6">
                            Are you sure you want to delete "{storyToDelete.title}"? This can’t be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button
                                size="sm"
                                variant="transparent"
                                className="bg-white/5 hover:bg-white/10"
                                onClick={() => setStoryToDelete(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                variant="transparent"
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => handleDeleteStory(storyToDelete)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardPage;
