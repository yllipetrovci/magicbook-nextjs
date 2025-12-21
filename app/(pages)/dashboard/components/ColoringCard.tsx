
import React from 'react';
import { Button } from '@/app/components';
import { GeneratedImage } from '@/app/types';

interface ColoringCardProps {
    image?: GeneratedImage;
    isLoading?: boolean;
    loadingLabel?: string;
    onPrint?: (e: React.MouseEvent) => void;
    onDelete?: (e: React.MouseEvent) => void;
}

export const ColoringCard: React.FC<ColoringCardProps> = ({
    image,
    isLoading = false,
    loadingLabel = "Sketching...",
    onPrint,
    onDelete
}) => {

    // --- LOADING STATE ---
    if (isLoading || !image) {
        return (
            <div className="bg-magic-card p-3 rounded-2xl border border-white/10 shadow-lg flex flex-col h-full relative overflow-hidden">
                {/* Animated Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-magic-blue/10 via-transparent to-magic-purple/10 animate-pulse"></div>

                {/* Image Skeleton */}
                <div className="relative w-full aspect-[4/5] bg-gray-900/50 rounded-xl overflow-hidden mb-3 border border-white/5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]"></div>

                    {/* Magic Icon Animation */}
                    <div className="flex flex-col items-center gap-2 z-10 opacity-80">
                        <i className="fa-solid fa-palette text-3xl text-magic-blue animate-bounce"></i>
                        <i className="fa-solid fa-paintbrush text-sm text-white absolute -top-2 -right-2 animate-wiggle"></i>
                        <span className="text-xs font-bold text-magic-blue animate-pulse mt-2">{loadingLabel}</span>
                    </div>
                </div>

                {/* Text Skeleton */}
                <div className="h-4 w-3/4 bg-white/10 rounded-full mb-2 animate-pulse"></div>
                <div className="h-8 w-full bg-white/5 rounded-full mt-auto animate-pulse"></div>
            </div>
        );
    }

    // --- READY STATE ---
    return (
        <div className="bg-magic-card p-3 rounded-2xl border border-white/10 hover:border-magic-blue/50 shadow-lg transition-all group relative flex flex-col h-full hover:-translate-y-1 duration-300">
            <div className="relative w-full aspect-[4/5] bg-white rounded-xl overflow-hidden mb-2 border border-white/5 group-hover:border-magic-blue/30 transition-all">
                <img
                    src={image.imageUrl}
                    alt="Coloring Page"
                    className="w-full h-full object-contain p-2 opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 right-2 bg-black/10 text-black/50 px-1.5 py-0.5 rounded text-[10px] font-bold">
                    A4
                </div>
            </div>

            <h3 className="text-sm font-black text-white mb-1 line-clamp-1" title={image.title}>{image.title}</h3>
            <p className="text-[10px] text-gray-500 mb-3">{image.formattedDate}</p>

            <div className="mt-auto flex gap-2">
                {onPrint && (
                    <Button onClick={onPrint} fullWidth size="sm" className="bg-white text-magic-bg hover:bg-gray-200 shadow-lg text-xs py-1.5 h-8 flex-1 font-bold">
                        <i className="fa-solid fa-print mr-1"></i> Print
                    </Button>
                )}
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors border border-red-500/20 flex-shrink-0"
                        title="Delete Page"
                    >
                        <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                )}
            </div>
        </div>
    );
};
