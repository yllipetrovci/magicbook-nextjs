
import React from 'react';
import { Button } from '@/app/components/Button';
import { GeneratedStory } from '@/app/types';

interface StoryCardProps {
  story?: GeneratedStory;
  isLoading?: boolean;
  loadingLabel?: string;
  onRead?: () => void;
  onDownload?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  isDownloading?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isLoading = false,
  loadingLabel = "Creating Magic...",
  onRead,
  onDownload,
  onDelete,
  isDownloading = false
}) => {
  
  // --- LOADING / SKELETON STATE ---
  if (isLoading || !story) {
    return (
      <div className="bg-magic-card p-3 rounded-2xl border border-white/10 shadow-lg flex flex-col h-full relative overflow-hidden group">
         {/* Animated Border Glow */}
         <div className="absolute inset-0 bg-gradient-to-r from-magic-purple/20 via-magic-orange/20 to-magic-blue/20 animate-pulse"></div>
         
         {/* Cover Skeleton */}
         <div className="relative w-full aspect-[3/2] bg-gray-900/50 rounded-xl overflow-hidden mb-3 border border-white/5 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-magic-purple/10 to-transparent animate-[shimmer_2s_infinite]"></div>
             
             {/* Magic Icon Animation */}
             <div className="flex flex-col items-center gap-2 z-10 opacity-80">
                 <div className="relative">
                    <i className="fa-solid fa-wand-magic-sparkles text-3xl text-magic-purple animate-wiggle"></i>
                    <i className="fa-solid fa-star text-xs text-yellow-400 absolute -top-1 -right-2 animate-spin-slow"></i>
                 </div>
                 <span className="text-xs font-bold text-magic-purple animate-pulse">{loadingLabel}</span>
             </div>
         </div>
         
         {/* Title Skeleton */}
         <div className="h-4 w-3/4 bg-white/10 rounded-full mb-2 animate-pulse"></div>
         
         {/* Meta Skeleton */}
         <div className="flex justify-between mb-3">
             <div className="h-3 w-16 bg-white/5 rounded-full animate-pulse"></div>
             <div className="h-3 w-16 bg-white/5 rounded-full animate-pulse"></div>
         </div>
         
         {/* Button Skeleton */}
         <div className="mt-auto h-8 w-full bg-white/5 rounded-full animate-pulse"></div>
      </div>
    );
  }

  console.log(story);
  const status = story?.status || 'completed';
  const isActionDisabled = status === 'pending' || status === 'processing' || status === 'failed';

  // --- READY STATE ---
  return (
    <div className="bg-magic-card p-3 rounded-2xl border border-white/10 hover:border-magic-purple/50 shadow-lg transition-all group relative flex flex-col h-full hover:-translate-y-1 duration-300">
      {/* Card Cover */}
      <div className="relative w-full aspect-[3/2] bg-gray-900 rounded-xl overflow-hidden mb-3 border border-white/5 group-hover:border-magic-purple/30 transition-all">
          <img 
            src={story.coverImage || `https://picsum.photos/seed/${story.title.replace(/\s/g,'')}/600/400`} 
            alt="Cover" 
            className={`w-full h-full object-cover transition-opacity duration-500 ${isActionDisabled ? 'opacity-40 blur-[2px]' : 'opacity-80 group-hover:opacity-100'}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
          
          {/* Status Badge */}
          <div className="absolute top-2 left-2 bg-magic-surface/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 shadow flex items-center gap-1 z-30">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'completed' ? 'bg-magic-green' : (status === 'failed' ? 'bg-red-500' : 'bg-yellow-400 animate-pulse')}`}></div>
            <span className="text-[10px] font-bold text-white max-w-[80px] truncate">{story.heroName || "Unknown"}</span>
          </div>

          {/* Status Overlay */}
          {status === 'pending' && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 animate-pulse border border-white/20">
                    <i className="fa-solid fa-hourglass-half text-white text-lg"></i>
                 </div>
                 <span className="text-white font-bold text-[10px] uppercase tracking-wider">In Queue</span>
             </div>
          )}

          {status === 'processing' && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
                 <div className="relative w-12 h-12 flex items-center justify-center mb-2">
                    <div className="absolute inset-0 border-4 border-magic-purple/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-magic-purple border-t-transparent rounded-full animate-spin"></div>
                    <i className="fa-solid fa-wand-magic-sparkles text-white text-sm animate-wiggle"></i>
                 </div>
                 <span className="text-magic-purple font-bold text-[10px] uppercase tracking-wider animate-pulse">Generating...</span>
             </div>
          )}

          {status === 'failed' && (
             <div className="absolute inset-0 bg-red-900/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
                 <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-2 border border-red-500/30">
                    <i className="fa-solid fa-triangle-exclamation text-red-400 text-lg"></i>
                 </div>
                 <span className="text-red-200 font-bold text-[10px] uppercase tracking-wider">Failed</span>
             </div>
          )}
      </div>
      
      <h3 className="text-base font-black text-white mb-0.5 line-clamp-1" title={story.title}>{story.title}</h3>
      <p className="text-xs text-gray-500 mb-3 flex items-center justify-between font-medium">
          {story.pages.length > 0 && <span>{story.pages.length} Pages</span>}
          <span>{story.formattedDate || 'Just now'}</span>
      </p>
      
      <div className="mt-auto flex gap-2">
          {onRead && (
             <Button 
                onClick={onRead} 
                fullWidth 
                size="sm" 
                variant="transparent"
                disabled={isActionDisabled}
                className={`flex-1 text-xs py-2 h-8 ${isActionDisabled ? 'opacity-50 bg-white/5 text-gray-500 cursor-not-allowed shadow-none border border-white/5' : 'bg-magic-blue hover:bg-blue-600 shadow-lg shadow-blue-500/20'}`}
             >
                {status === 'processing' ? 'Wait...' : (status === 'failed' ? 'Error' : 'Read Story')}
             </Button>
          )}
          
          {onDownload && (
            <button 
              onClick={onDownload}
              disabled={isDownloading || isActionDisabled}
              className={`h-8 w-8 rounded-full border flex items-center justify-center flex-shrink-0 group/btn transition-all ${isActionDisabled ? 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed' : 'bg-magic-surface border-white/10 text-white hover:bg-white/10'}`}
              title="Download PDF"
            >
              {isDownloading ? (
                  <i className="fa-solid fa-spinner fa-spin text-xs text-magic-orange"></i>
              ) : (
                  <i className="fa-solid fa-file-pdf text-xs text-gray-400 group-hover/btn:text-red-400 transition-colors"></i>
              )}
            </button>
          )}

          {onDelete && (
            <button 
              onClick={onDelete}
              className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors border border-red-500/20 flex-shrink-0"
              title="Delete Story"
            >
              <i className="fa-solid fa-trash text-xs"></i>
            </button>
          )}
      </div>
    </div>
  );
};
