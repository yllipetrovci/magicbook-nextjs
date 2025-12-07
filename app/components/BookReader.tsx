
import React, { useState, useEffect, useRef } from 'react';
import { GeneratedStory } from '../types';
import { playPageTurnSound } from '../utils/audio';

interface BookReaderProps {
  story: GeneratedStory;
  onClose?: () => void;
  onComplete?: () => void;
  initialSheet?: number;
}

const getIllustrationUrl = (page: { image?: string, imageDescription?: string } | undefined, seed: string) => {
  if (!page) return `https://picsum.photos/seed/${seed}/600/800`;
  if (page.image) return page.image;
  if (page.imageDescription) {
    const prompt = encodeURIComponent(`children book illustration ${page.imageDescription} pixar style cute colorful`);
    return `https://image.pollinations.ai/prompt/${prompt}?width=600&height=800&nologo=true&seed=${seed}`;
  }
  return `https://picsum.photos/seed/${seed}/600/800`;
};

// SVG Noise Filter for Paper Texture feel
const NOISE_OVERLAY = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`;

const READER_THEMES = [
  {
    id: 'midnight',
    label: 'Midnight',
    style: { background: 'radial-gradient(circle at 50% 0%, #1a1c2e 0%, #0B0C15 100%)' },
    preview: 'bg-[#0B0C15]'
  },
  {
    id: 'clouds',
    label: 'Dreamy Clouds',
    style: {
      backgroundImage: 'url("https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2574&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    preview: 'bg-blue-200'
  },
  {
    id: 'paper',
    label: 'Vintage Paper',
    style: {
      backgroundColor: '#e3d2b4',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
      backgroundBlendMode: 'multiply'
    },
    preview: 'bg-[#e3d2b4]'
  },
  {
    id: 'clean_paper',
    label: 'Clean Linen',
    style: {
      backgroundColor: '#f3f4f6',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/linen.png")',
      backgroundBlendMode: 'multiply'
    },
    preview: 'bg-gray-100'
  },
  {
    id: 'watercolor',
    label: 'Watercolor',
    style: {
      backgroundColor: '#fff7ed',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/watercolor.png")',
      backgroundBlendMode: 'multiply'
    },
    preview: 'bg-orange-50'
  },
  {
    id: 'leaves',
    label: 'Quiet Leaves',
    style: {
      backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-9a847e0d3886?q=80&w=2574&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    preview: 'bg-green-800'
  },
  {
    id: 'magic',
    label: 'Magic Nebula',
    style: {
      backgroundImage: 'url("https://images.unsplash.com/photo-1501862700950-18382cd41497?q=80&w=1947&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    preview: 'bg-purple-900'
  }
];

export const BookReader: React.FC<BookReaderProps> = ({ story, onClose, onComplete, initialSheet = 0 }) => {
  const [currentSheet, setCurrentSheet] = useState(initialSheet);
  const totalSheets = 2 + story.pages.length;

  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(READER_THEMES[0]);
  const [showThemePicker, setShowThemePicker] = useState(false);

  // Audio Player State
  const [isReading, setIsReading] = useState(false);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Constants for "Big full-page layout"
  const BOOK_WIDTH = 1200; // Wider spread
  const BOOK_HEIGHT = 800; // Taller

  // Responsive Scaling
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const UI_OFFSET = 100; // Space for controls

      const availableWidth = width - 40;
      const availableHeight = height - UI_OFFSET;

      let newScale = Math.min(availableWidth / BOOK_WIDTH, availableHeight / BOOK_HEIGHT);
      if (newScale > 1.1) newScale = 1.1; // Max scale cap
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Audio Playback Handler
  const toggleReadAloud = (text: string) => {
    const synth = synthRef.current;

    if (synth.speaking && isReading) {
      synth.cancel();
      setIsReading(false);
    } else {
      synth.cancel(); // Stop any previous

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Attempt to find a suitable voice
      const voices = synth.getVoices();
      // Prefer Google US English, or any female voice, or English
      const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
        voices.find(v => v.name.includes('Female')) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.rate = 0.9; // Slightly slower for storytelling
      utterance.pitch = 1.05; // Slightly higher/warmer

      utterance.onend = () => {
        setIsReading(false);
      };

      synth.speak(utterance);
      setIsReading(true);
    }
  };

  // Stop reading when page changes or component unmounts
  useEffect(() => {
    const synth = synthRef.current;
    return () => {
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    // Stop speaking when turning pages
    if (isReading) {
      synthRef.current.cancel();
      setIsReading(false);
    }
  }, [currentSheet]);


  const nextSheet = () => {
    if (currentSheet < totalSheets) {
      playPageTurnSound();
      setCurrentSheet(prev => prev + 1);
      if (currentSheet === totalSheets - 2 && onComplete) {
        setTimeout(onComplete, 1000);
      }
    }
  };

  const prevSheet = () => {
    if (currentSheet > 0) {
      playPageTurnSound();
      setCurrentSheet(prev => prev - 1);
    }
  };

  const handleStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const handleEnd = (clientX: number, target: EventTarget | null) => {
    if (target && (target as HTMLElement).closest('button')) {
      touchStartX.current = null;
      return;
    }
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSheet();
      else prevSheet();
    }
    touchStartX.current = null;
  };

  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => handleEnd(e.changedTouches[0].clientX, e.target);
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseUp = (e: React.MouseEvent) => handleEnd(e.clientX, e.target);

  // --- Render Helpers ---

  const renderCover = () => (
    <div className="sheet" style={{ zIndex: currentSheet === 0 ? 50 : 0 }}>
      {/* Front Cover */}
      <div className="page front cover bg-[#1e293b] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-2xl border-l-4 border-white/5 rounded-r-xl">
        <img
          src={story.coverImage || getIllustrationUrl({ imageDescription: story.title + " cover" }, story.title + "cover")}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

        <div className="relative z-10 mt-auto mb-auto transform scale-110">
          <div className="bg-[#0B0C15]/90 backdrop-blur-md px-10 py-6 rounded-2xl border-2 border-[#FF9F1C] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <h1 className="text-3xl md:text-5xl font-black text-[#FF9F1C] tracking-tight leading-tight font-display drop-shadow-lg">
              {story.title}
            </h1>
          </div>
        </div>

        <div className="relative z-10 mb-12 mt-auto">
          <div className="inline-block bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
            <p className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase mb-1">Written For</p>
            <p className="text-white font-bold text-xl font-serif">{story.heroName || "The Hero"}</p>
          </div>
        </div>
      </div>

      {/* Inner Cover (Left Side when open) */}
      <div className="page back bg-[#2C1A18] relative flex items-center justify-center shadow-[inset_-10px_0_30px_rgba(0,0,0,0.5)] rounded-l-xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
        <div className="text-white/30 font-serif italic text-sm absolute bottom-8">Ex Libris • AI Magic Book</div>
      </div>
    </div>
  );

  const renderTitleSheet = () => (
    <div className="sheet" style={{ zIndex: currentSheet <= 1 ? 49 : 1 }}>
      {/* Title Page (Right Side of Spread 1) */}
      <div className="page front paper flex flex-col items-center justify-center p-8 md:p-12 text-center border-l border-black/5 relative overflow-hidden rounded-r-sm"
        style={{
          backgroundColor: '#fdf6e3',
          backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png"), ${NOISE_OVERLAY}`,
          backgroundBlendMode: 'multiply, overlay',
          backgroundSize: '300px, auto'
        }}
      >
        <div className="absolute inset-8 border-double border-4 border-gray-800/20 rounded-sm pointer-events-none"></div>

        <div className="relative z-10">
          <i className="fa-solid fa-wand-magic-sparkles text-4xl text-magic-purple mb-6 opacity-80"></i>
          <h2 className="text-4xl md:text-6xl font-display font-black text-gray-800 mb-4 leading-tight">{story.title}</h2>
          <div className="w-24 h-1 bg-gray-800/10 mx-auto my-6 rounded-full"></div>
          <p className="text-gray-500 font-serif italic mb-2">A magical tale for</p>
          <p className="text-2xl md:text-3xl font-bold text-magic-orange font-serif">{story.heroName || "The Hero"}</p>
        </div>
      </div>

      {/* Page 1 Image (Left Side of Spread 2) */}
      <div className="page back bg-white overflow-hidden relative border-r border-gray-300 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] rounded-l-sm">
        <img
          src={getIllustrationUrl(story.pages[0], story.title + "0")}
          className="w-full h-full object-cover pointer-events-none"
          alt="Page 1"
          draggable={false}
        />
        {/* Shadow Gradient for Spine */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );

  const renderStorySheets = () => {
    return story.pages.map((page, index) => {
      const nextContent = story.pages[index + 1];
      const zIndex = currentSheet <= index + 2 ? (48 - index) : (2 + index);

      const isVisible = currentSheet === index + 2;
      const isReadingThisPage = isReading && isVisible;

      return (
        <div key={index} className="sheet" style={{ zIndex }}>
          {/* Text Page (Right Side) */}
          <div className="page front paper flex flex-col justify-center text-center border-l border-black/5 relative overflow-hidden rounded-r-sm shadow-[inset_20px_0_40px_rgba(0,0,0,0.05)]"
            style={{
              backgroundColor: '#fdf6e3',
              backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png"), ${NOISE_OVERLAY}`,
              backgroundBlendMode: 'multiply, overlay',
              backgroundSize: '300px, auto'
            }}
          >
            {/* Spine Shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10"></div>

            {/* Audio Player Button */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleReadAloud(page.text); }}
              className={`absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-30 shadow-sm border ${isReadingThisPage ? 'bg-magic-orange text-white border-magic-orange animate-pulse' : 'bg-black/5 text-magic-orange border-black/10 hover:bg-white hover:scale-110'}`}
              title="Read to me"
            >
              {isReadingThisPage ? (
                <i className="fa-solid fa-stop text-sm"></i>
              ) : (
                <i className="fa-solid fa-volume-high text-sm"></i>
              )}
            </button>

            <div className="relative z-20 px-12 py-16 h-full flex flex-col">
              <div className="text-gray-400 font-serif italic text-xs mb-auto text-center tracking-[0.2em] uppercase opacity-60">Page {index + 1}</div>

              <div className="prose prose-xl md:prose-2xl font-serif text-gray-800 leading-loose text-left mx-auto max-w-lg selection:bg-magic-yellow/30 drop-shadow-sm">
                <span className="float-left text-6xl md:text-7xl font-black text-magic-orange mr-4 mt-[-12px] font-display drop-shadow-sm leading-none">{page.text.charAt(0)}</span>
                {page.text.slice(1)}
              </div>

              <div className="mt-auto opacity-20 text-magic-purple text-2xl flex justify-center">
                <i className="fa-brands fa-pagelines"></i>
              </div>
            </div>
          </div>

          {/* Next Image Page (Left Side) */}
          <div className="page back bg-white overflow-hidden relative border-r border-gray-300 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] rounded-l-sm">
            {nextContent ? (
              <>
                <img
                  src={getIllustrationUrl(nextContent, story.title + (index + 1))}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  alt={`Page ${index + 2}`}
                  draggable={false}
                />
                {/* Spine Shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
              </>
            ) : (
              <div className="w-full h-full bg-[#1e293b] flex flex-col items-center justify-center relative shadow-[inset_-10px_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                <h2 className="text-5xl md:text-7xl font-display text-white mb-6 relative z-10 font-black tracking-widest drop-shadow-lg">THE END</h2>
                {onComplete && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onComplete(); }}
                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all z-10 font-bold backdrop-blur-md hover:scale-110 active:scale-95 text-lg"
                  >
                    Close Book
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center select-none transition-all duration-700 ease-in-out relative"
      ref={containerRef}
      style={activeTheme.style}
    >
      {/* Global Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: NOISE_OVERLAY }}
      ></div>

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">

        {/* Theme Picker */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            title="Change Background"
          >
            <i className="fa-solid fa-image"></i>
          </button>

          {showThemePicker && (
            <div className="absolute top-full right-0 mt-3 p-3 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-2 animate-fade-in w-56 z-[60] max-h-[60vh] overflow-y-auto">
              <div className="text-xs font-bold text-gray-400 mb-1 px-1 sticky top-0 bg-black/80 backdrop-blur-xl z-10 pb-2">SELECT BACKGROUND</div>
              {READER_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => { setActiveTheme(theme); setShowThemePicker(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 transition-all hover:bg-white/10 ${activeTheme.id === theme.id ? 'bg-white/20 ring-1 ring-white/50' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full shadow-sm border border-white/20 ${theme.preview}`} style={theme.style.background ? { background: theme.style.background } : {}}></div>
                  <span className="text-sm font-bold text-white">{theme.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          title={isFullscreen ? "Exit Full View" : "Enter Full View"}
        >
          <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
        </button>
      </div>

      <div
        className="relative transition-all duration-300 ease-out z-10"
        style={{
          width: BOOK_WIDTH * scale,
          height: BOOK_HEIGHT * scale,
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left cursor-grab active:cursor-grabbing"
          style={{
            transform: `scale(${scale})`,
            width: BOOK_WIDTH,
            height: BOOK_HEIGHT,
            perspective: '2000px', // Deeper perspective for "Big" feel
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <div className="book relative w-full h-full transform-style-3d shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            {renderCover()}
            {renderTitleSheet()}
            {renderStorySheets()}

            {/* Back Cover */}
            <div className="sheet" style={{ zIndex: currentSheet === totalSheets ? 50 : 0 }}>
              <div className="page front bg-[#2C1A18] flex items-center justify-center">
                <div className="w-full h-full bg-[#2C1A18] relative shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="page back bg-[#1e293b] border-r-4 border-white/10 flex items-center justify-center shadow-2xl rounded-l-xl">
                <div className="text-center opacity-40 z-10">
                  <i className="fa-solid fa-book-open text-6xl mb-4 text-[#FF9F1C]"></i>
                  <p className="text-white font-bold tracking-widest uppercase">AI Magic Book</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Premium Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up-fade">
        <div className="bg-black/80 backdrop-blur-md p-2 pl-6 pr-6 rounded-full border border-white/10 shadow-2xl flex items-center gap-6">
          <button
            onClick={prevSheet}
            disabled={currentSheet === 0}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-gray-900 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </button>

          <span className="text-white font-bold text-lg font-mono min-w-[60px] text-center">
            {currentSheet === 0 ? 'Cover' : currentSheet === totalSheets ? 'End' : `${currentSheet} / ${totalSheets - 1}`}
          </span>

          <button
            onClick={nextSheet}
            disabled={currentSheet === totalSheets}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-gray-900 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <i className="fa-solid fa-arrow-right text-lg"></i>
          </button>
        </div>
      </div>

      <style>{`
            .sheet { position: absolute; width: 50%; height: 100%; top: 0; left: 50%; transform-origin: left center; transform-style: preserve-3d; transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1); }
            ${Array.from({ length: totalSheets + 1 }).map((_, i) => `.sheet:nth-child(${i + 1}) { transform: rotateY(${i < currentSheet ? '-180deg' : '0deg'}); }`).join('\n')}
            .page { position: absolute; width: 100%; height: 100%; top: 0; left: 0; backface-visibility: hidden; overflow: hidden; }
            .page.front { transform: rotateY(0deg); }
            .page.back { transform: rotateY(180deg); }
        `}</style>
    </div>
  );
};
