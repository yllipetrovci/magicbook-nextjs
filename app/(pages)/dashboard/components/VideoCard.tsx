
import React from 'react';
import { Button } from '@/app/components/Button';
import { GeneratedVideo } from '@/app/types';

interface VideoCardProps {
    video?: GeneratedVideo;
    isLoading?: boolean;
    loadingLabel?: string;
    onWatch?: () => void;
    onDelete?: (e: React.MouseEvent) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
    video,
    isLoading = false,
    loadingLabel = "Rendering Magic...",
    onWatch,
    onDelete
}) => {

    // --- LOADING STATE ---
    if (isLoading || !video) {
        return (
            <div className="bg-magic-card p-3 rounded-2xl border border-white/10 shadow-lg flex flex-col h-full relative overflow-hidden">
                {/* Animated Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-magic-green/10 via-transparent to-magic-blue/10 animate-pulse"></div>

                {/* Thumbnail Skeleton */}
                <div className="relative w-full aspect-video bg-gray-900/50 rounded-xl overflow-hidden mb-3 border border-white/5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]"></div>

                    {/* Magic Icon Animation */}
                    <div className="flex flex-col items-center gap-2 z-10 opacity-80">
                        <div className="w-12 h-12 rounded-full border-4 border-magic-green border-t-transparent animate-spin flex items-center justify-center"></div>
                        <i className="fa-solid fa-film text-xl text-magic-green absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
                        <span className="text-xs font-bold text-magic-green animate-pulse mt-8">{loadingLabel}</span>
                    </div>
                </div>

                {/* Text Skeleton */}
                <div className="h-4 w-2/3 bg-white/10 rounded-full mb-2 animate-pulse"></div>
                <div className="h-8 w-full bg-white/5 rounded-full mt-auto animate-pulse"></div>
            </div>
        );
    }

    // --- READY STATE ---
    return (
        <div className="bg-magic-card p-3 rounded-2xl border border-white/10 hover:border-magic-green/50 shadow-lg transition-all group relative flex flex-col h-full hover:-translate-y-1 duration-300">
            <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden mb-2 border border-white/5 group-hover:border-magic-green/30 transition-all cursor-pointer" onClick={onWatch}>
                <img
                    src={video.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform shadow-xl">
                        <i className="fa-solid fa-play text-white text-sm ml-0.5"></i>
                    </div>
                </div>
                <div className="absolute bottom-2 right-2">
                    <span className="bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                        {video.duration}
                    </span>
                </div>
            </div>

            <h3 className="text-sm font-black text-white mb-1 line-clamp-1" title={video.title}>{video.title}</h3>
            <p className="text-[10px] text-gray-500 mb-3">{new Date(video.date).toLocaleDateString()}</p>

            <div className="mt-auto flex gap-2">
                {onWatch && (
                    <Button onClick={onWatch} variant='transparent' fullWidth size="sm" className="bg-magic-green hover:bg-green-600 shadow-lg shadow-green-500/20 text-xs py-1.5 h-8 flex-1">
                        Watch
                    </Button>
                )}
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors border border-red-500/20 flex-shrink-0"
                        title="Delete Video"
                    >
                        <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                )}
            </div>
        </div>
    );
};
