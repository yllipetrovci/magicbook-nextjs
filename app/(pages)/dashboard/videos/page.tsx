

'use client';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { VideoCard } from '../components/VideoCard';
import { DashboardSection } from '../components/DashboardSection';
import { VideoPlayerModal } from '@/app/components/VideoPlayerModal';
import { GeneratedVideo } from '@/app/types';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useStory } from '@/app/contexts/StoryContext';

export const Videos: React.FC = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const { videos, videosLoaded } = useStory();

    const [selectedVideo, setSelectedVideo] = useState<GeneratedVideo | null>(null);
    const isVideosLoading = !videosLoaded;
    const placeholderVideos = useMemo<(GeneratedVideo | null)[]>(() => Array.from({ length: 3 }, () => null), []);
    const videosToRender = isVideosLoading ? placeholderVideos : videos;
    const videoCount = videosLoaded ? videos.length : 0;

    const handleCreateNewVideo = () => {
        router.push('/create-video');
    };

    return (
        <>
            {selectedVideo && (
                <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
            )}

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-magic-card/30 p-6 rounded-3xl border border-white/5 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1 drop-shadow-lg flex items-center gap-2">
                        Magic Videos <i className="fa-solid fa-film text-magic-green ml-2"></i>
                    </h1>
                    <p className="text-gray-400 text-sm font-bold">
                        Watch your stories come to life.
                    </p>
                </div>
                <Button onClick={handleCreateNewVideo} size="md" variant="transparent" className="shadow-lg shadow-purple-500/20 bg-magic-blue hover:bg-blue-600">
                    Create Video <i className="fa-solid fa-video ml-2"></i>
                </Button>
            </div>

            <DashboardSection
                title={t('dash_videos')}
                icon="fa-film"
                iconColor="text-magic-green"
                count={videoCount}
                countLabel="watching"
                badgeColor="text-red-400"
                dotColor="bg-red-500"
                items={videosToRender}
                onCreate={handleCreateNewVideo}
                gridCols="grid-cols-1 lg:grid-cols-3"
                emptyState={{
                    icon: 'fa-video-slash',
                    message: t('dash_no_videos'),
                    buttonLabel: t('dash_create_video'),
                    buttonIcon: 'fa-video'
                }}
                createCard={
                    isVideosLoading
                        ? undefined
                        : {
                            title: t('dash_create_video'),
                            subtext: "2 Credits",
                            icon: "fa-plus",
                            theme: "green",
                        }
                }
                renderItem={(video: GeneratedVideo | null, index: number) => (
                    <VideoCard
                        key={video ? video.id ?? `video-${index}` : `video-placeholder-${index}`}
                        video={video || undefined}
                        isLoading={isVideosLoading}
                        onWatch={video ? () => setSelectedVideo(video) : undefined}
                        onDelete={video ? (e) => { e.stopPropagation(); } : undefined}
                    />
                )}
            />
        </>
    );
};


export default Videos;
