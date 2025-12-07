

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { VideoCard } from '../components/VideoCard';
import { DashboardSection } from '../components/DashboardSection';
import { VideoPlayerModal } from '@/app/components/VideoPlayerModal';
import { GeneratedVideo } from '@/app/types';

export const Videos: React.FC = () => {
    const router = useRouter();
    const { savedVideos, t, deleteVideo } = useStory();
    const [selectedVideo, setSelectedVideo] = useState<GeneratedVideo | null>(null);

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
                <Button onClick={handleCreateNewVideo} size="md" className="shadow-lg shadow-green-500/20 bg-magic-green hover:bg-green-600">
                    Create Video <i className="fa-solid fa-video ml-2"></i>
                </Button>
            </div>

            <DashboardSection
                title={t('dash_videos')}
                icon="fa-film"
                iconColor="text-magic-green"
                count={savedVideos.length}
                countLabel="watching"
                badgeColor="text-red-400"
                dotColor="bg-red-500"
                items={savedVideos}
                onCreate={handleCreateNewVideo}
                gridCols="grid-cols-1 lg:grid-cols-3"
                emptyState={{
                    icon: 'fa-video-slash',
                    message: t('dash_no_videos'),
                    buttonLabel: t('dash_create_video'),
                    buttonIcon: 'fa-video'
                }}
                createCard={{
                    title: t('dash_create_video'),
                    subtext: "2 Credits",
                    icon: "fa-plus",
                    theme: "green"
                }}
                renderItem={(video) => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onWatch={() => setSelectedVideo(video)}
                        onDelete={(e) => { e.stopPropagation(); deleteVideo(video.id); }}
                    />
                )}
            />
        </>
    );
};


export default Videos;