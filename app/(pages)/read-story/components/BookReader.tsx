
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GeneratedStory, ReadingStyle, VoiceStyle, GeneratedPage } from '@/app/types';
import { playPageTurnSound, playMagicSound } from '@/app/utils/audio';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { NarrationButton } from './NarrationButton';
import { ReaderHeader } from './RenderHeader';

// --- SUB-COMPONENTS ---

interface PageControlProps {
  isReading: boolean;
  isCinematic: boolean;
  onToggleNarration: () => void;
  onToggleCinematic: () => void;
  variant?: 'large' | 'small' | 'floating';
}

const PageControls: React.FC<PageControlProps> = ({ 
  isReading, isCinematic, onToggleNarration, onToggleCinematic, variant = 'large' 
}) => (
  <div className="flex justify-center gap-3">
    <button 
      onClick={onToggleCinematic} 
      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isCinematic ? 'bg-magic-purple border-magic-purple text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`} 
      title="Auto-Cinematic Mode"
    >
      <i className="fa-solid fa-clapperboard text-xs"></i>
    </button>
    <NarrationButton isReading={isReading} onClick={onToggleNarration} variant={variant} />
  </div>
);

interface PageProps {
  page: any;
  isCinematic: boolean;
  isReading: boolean;
  onToggleNarration: () => void;
  onToggleCinematic: () => void;
  pageIndex: number;
}

const ModernLayout: React.FC<PageProps> = (props) => (
  <div className="flex flex-col items-center w-full gap-5 md:gap-8 px-4 py-4 md:py-12">
    <div className="relative w-full max-w-xl aspect-square md:aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white/5 bg-black/40 group">
      <img src={props.page.img} alt={props.page.imageAltText} className={`w-full h-full object-cover transition-transform duration-[1500ms] ${props.isCinematic ? 'animate-ken-burns' : 'group-hover:scale-110'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
    </div>
    <div className="w-full max-w-2xl space-y-4 md:space-y-6 text-center animate-slide-up-fade pb-8">
      <p className="text-lg md:text-3xl font-serif font-medium text-white leading-relaxed px-2 md:px-4 text-balance drop-shadow-sm">{props.page.text}</p>
      <PageControls {...props} />
    </div>
  </div>
);

const CinematicLayout: React.FC<PageProps> = (props) => (
  <div className="relative w-full h-full animate-fade-in">
    <img src={props.page.img} alt={props.page.imageAltText} className={`absolute inset-0 w-full h-full object-cover ${props.isCinematic ? 'animate-ken-burns' : ''}`} />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C15] via-transparent to-black/30"></div>
    <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
      <div className="bg-black/60 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl text-center space-y-4 md:space-y-6 animate-slide-up-fade">
        <p className="text-lg md:text-2xl font-serif font-medium text-white leading-relaxed drop-shadow-sm">{props.page.text}</p>
        <PageControls {...props} variant="small" />
      </div>
    </div>
  </div>
);

const SplitLayout: React.FC<PageProps> = (props) => (
  <div className="flex flex-col md:flex-row w-full min-h-full animate-fade-in">
    <div className="w-full md:w-1/2 h-[45vh] md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black">
      <img src={props.page.img} alt={props.page.imageAltText} className={`w-full h-full object-cover transition-transform duration-[1500ms] ${props.isCinematic ? 'animate-ken-burns' : 'hover:scale-110'}`} />
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-16 text-center space-y-6 md:space-y-8 bg-[#0B0C15]/40 min-h-[40vh] md:min-h-0">
      <p className="text-xl md:text-4xl font-serif font-bold text-white leading-snug drop-shadow-sm">{props.page.text}</p>
      <PageControls {...props} />
    </div>
  </div>
);

const MinimalLayout: React.FC<PageProps> = (props) => (
  <div className="flex flex-col items-center w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 md:py-12 animate-fade-in">
    <div className="w-full mb-6 md:mb-10 rounded-[1.25rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative">
      <img src={props.page.img} alt={props.page.imageAltText} className={`w-full h-full object-cover transition-transform duration-[1500ms] ${props.isCinematic ? 'animate-ken-burns' : ''}`} />
      <button onClick={props.onToggleCinematic} className={`absolute top-4 right-4 w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${props.isCinematic ? 'bg-magic-purple border-magic-purple text-white shadow-lg' : 'bg-black/40 border-white/20 text-gray-300'}`}>
        <i className="fa-solid fa-clapperboard text-xs"></i>
      </button>
    </div>
    <div className="text-center space-y-6 md:space-y-10 pb-8">
      <p className="text-xl md:text-3xl font-serif font-medium text-white leading-relaxed drop-shadow-lg max-w-xl mx-auto">{props.page.text}</p>
      <div className="text-gray-500 font-bold text-xs md:text-sm tracking-[0.4em] opacity-50">- {props.pageIndex + 1} -</div>
      <div className="flex justify-center gap-3">
        <NarrationButton isReading={props.isReading} onClick={props.onToggleNarration} variant="large" />
      </div>
    </div>
  </div>
);

const OverlayLayout: React.FC<PageProps> = (props) => (
  <div className="relative w-full h-full animate-fade-in flex flex-col justify-end overflow-hidden">
    <img src={props.page.img} alt={props.page.imageAltText} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ${props.isCinematic ? 'animate-ken-burns' : ''}`} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-95 pointer-events-none"></div>
    <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-8 md:pb-12 text-center transition-all duration-700">
      <div className="relative inline-block w-full max-w-2xl bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-500">
          <button onClick={props.onToggleCinematic} className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-xl ${props.isCinematic ? 'bg-magic-purple/60 border-magic-purple text-white animate-pulse' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-black/50 hover:text-white'}`}>
            <i className="fa-solid fa-clapperboard text-xs"></i>
          </button>
          <NarrationButton isReading={props.isReading} onClick={props.onToggleNarration} variant="floating" />
        </div>
        <p className="text-base md:text-lg lg:text-xl font-serif font-medium text-white leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,1)] px-2">{props.page.text}</p>
        <div className="text-white/40 font-bold text-[9px] md:text-xs tracking-[0.4em] drop-shadow-md mt-4">- {props.pageIndex + 1} -</div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

interface BookReaderProps {
  story: any;
  onClose?: () => void;
  onComplete?: () => void;
}

export const BookReader: React.FC<BookReaderProps> = ({ story, onClose, onComplete }) => {
  const { readingStyle, voiceStyle } = useStory();
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [isReading, setIsReading] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const isCover = currentPageIndex === -1;
  const isEnd = currentPageIndex === story.pages.length;
  const currentPage = !isCover && !isEnd ? story.pages[currentPageIndex] : null;
  const totalPages = story.pages.length;

  const next = () => {
    if (currentPageIndex < totalPages) {
      playPageTurnSound();
      setCurrentPageIndex(prev => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const prev = () => {
    if (currentPageIndex > -1) {
      playPageTurnSound();
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const toggleCinematic = () => {
    playMagicSound();
    setIsCinematic(!isCinematic);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const toggleReadAloud = (text: string) => {
    const synth = synthRef.current;
    if (synth?.speaking) {
      synth.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      switch (voiceStyle) {
        case VoiceStyle.GRANDMA: utterance.rate = 0.8; utterance.pitch = 1.1; break;
        case VoiceStyle.WIZARD: utterance.rate = 0.7; utterance.pitch = 0.8; break;
        case VoiceStyle.PIXIE: utterance.rate = 1.2; utterance.pitch = 1.4; break;
        default: utterance.rate = 0.95; utterance.pitch = 1.0; break;
      }
      utterance.onend = () => setIsReading(false);
      synth?.speak(utterance);
      setIsReading(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape' && onClose) onClose();
    };
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFsChange);
      synthRef?.current?.cancel();
    };
  }, [currentPageIndex]);

  const renderCurrentPage = () => {
    if (!currentPage) return null;
    const props = { 
      page: currentPage, 
      isCinematic, 
      isReading, 
      onToggleNarration: () => toggleReadAloud(currentPage.text), 
      onToggleCinematic: toggleCinematic,
      pageIndex: currentPageIndex
    };

    switch (readingStyle) {
      case ReadingStyle.MODERN: return <ModernLayout {...props} />;
      case ReadingStyle.CINEMATIC: return <CinematicLayout {...props} />;
      case ReadingStyle.SPLIT: return <SplitLayout {...props} />;
      case ReadingStyle.MINIMAL: return <MinimalLayout {...props} />;
      case ReadingStyle.OVERLAY: return <OverlayLayout {...props} />;
      default: return <ModernLayout {...props} />;
    }
  };

  return (
    <div className="relative h-full w-full bg-[#0B0C15] flex flex-col items-center overflow-hidden font-sans transition-all duration-700">
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-magic-purple/5 blur-[120px] rounded-full"></div>
      </div>

      <ReaderHeader 
        title={story.title}
        currentPage={currentPageIndex}
        totalPages={totalPages}
        isCover={isCover}
        isEnd={isEnd}
        isFullscreen={isFullscreen}
        onClose={onClose || (() => {})}
        onToggleFullscreen={toggleFullscreen}
      /> 

      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 overflow-auto">
          
          {/* Navigation Controls */}
          <button onClick={prev} className={`flex absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all z-30 ${isCover ? 'opacity-0 pointer-events-none' : 'opacity-100 shadow-2xl backdrop-blur-md'}`}>
            <i className="fa-solid fa-chevron-left text-xl md:text-2xl"></i>
          </button>
          <button onClick={next} className={`flex absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-magic-purple/30 border border-magic-purple/40 items-center justify-center text-white hover:bg-magic-purple/50 hover:scale-110 transition-all z-30 ${isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100 shadow-2xl backdrop-blur-md'}`}>
            <i className="fa-solid fa-chevron-right text-xl md:text-2xl"></i>
          </button>

          {!isCover && !isEnd && (
            <div className="absolute inset-0 z-0 flex">
                <div className="flex-1 h-full cursor-w-resize" onClick={prev}></div>
                <div className="flex-1 h-full cursor-e-resize" onClick={next}></div>
            </div>
          )}

          <div className={`w-full relative z-10 h-full flex flex-col overflow-y-auto scrollbar-hide ${readingStyle === ReadingStyle.SPLIT ? 'max-w-none' : 'max-w-4xl'}`}>
              {isCover && (
                  <div className="flex flex-col items-center justify-center min-h-full gap-6 md:gap-8 animate-slide-up-fade px-4 py-8">
                      <div className="relative w-full aspect-[2/3] max-w-[280px] md:max-w-[380px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-white/10 group">
                           <img src={story.coverImg} alt={story.coverImageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent"></div>
                           <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-4 md:px-6 text-center">
                               <h1 className="text-2xl md:text-5xl font-display font-black text-white leading-tight mb-2 drop-shadow-lg">{story.title}</h1>
                               <p className="text-magic-orange font-bold tracking-widest uppercase text-[10px] md:text-xs">{story.author}</p>
                           </div>
                      </div>
                      <Button onClick={next} size="lg" className="px-10 md:px-12 py-3 md:py-4 bg-magic-purple shadow-lg shadow-purple-500/20 text-lg md:text-xl font-display border-t border-white/20">
                          Open Story <i className="fa-solid fa-book-open ml-2"></i>
                      </Button>
                  </div>
              )}

              {renderCurrentPage()}

              {isEnd && (
                  <div className="flex flex-col items-center justify-center min-h-full gap-6 md:gap-8 animate-slide-up-fade text-center px-4 py-12">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-magic-green/20 flex items-center justify-center text-4xl md:text-6xl text-magic-green mb-4 shadow-[0_0_40px_rgba(52,211,153,0.2)]">
                          <i className="fa-solid fa-heart animate-bounce-slow"></i>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white mb-1 font-display">The End</h2>
                      <div className="flex gap-3 md:gap-4 relative z-20">
                          <Button onClick={() => setCurrentPageIndex(-1)} variant="outline" className="border-white/20 text-white text-sm md:text-base px-6">Read Again</Button>
                          <Button onClick={onClose} variant="transparent" className="bg-magic-green shadow-green-500/20 shadow-lg border-t border-white/20 text-sm md:text-base px-6">Close Book</Button>
                      </div>
                  </div>
              )}
          </div>
      </div>

      <div className="w-full bg-[#0B0C15]/90 backdrop-blur-xl border-t border-white/5 p-4 md:p-6 relative z-20">
          <div className="max-w-lg mx-auto flex items-center justify-center">
              <div className="flex gap-2 md:gap-2.5 px-2">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${isCover ? 'bg-magic-orange scale-150 shadow-[0_0_10px_rgba(249,115,22,1)]' : 'bg-white/20'}`}></div>
                  {story.pages.map((_:any, i:number) => (
                      <div key={i} className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${currentPageIndex === i ? 'bg-magic-purple scale-150 shadow-[0_0_10px_rgba(168,85,247,1)]' : 'bg-white/20'}`}></div>
                  ))}
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${isEnd ? 'bg-magic-green scale-150 shadow-[0_0_10px_rgba(52,211,153,1)]' : 'bg-white/20'}`}></div>
              </div>
          </div>
      </div>
    </div>
  );
};
