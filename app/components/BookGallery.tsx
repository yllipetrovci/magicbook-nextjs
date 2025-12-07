
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '@/app/contexts/LanguageContext';

const BookCard = ({ title, author, img, color, onClick }: { title: string, author: string, img: string, color: string, onClick: () => void }) => (
  <div onClick={onClick} className="min-w-[220px] md:min-w-[260px] h-[340px] md:h-[380px] relative group perspective-1000 cursor-pointer mx-4 select-none">
    <div className="w-full h-full relative transform-style-3d transition-transform duration-500 group-hover:-translate-y-6 group-hover:rotate-y-12">
      {/* Spine */}
      <div className="absolute top-1 bottom-1 left-0 w-6 bg-gray-900 rounded-l-lg opacity-50 z-0 transform -translate-x-2 translate-z-[-2px]"></div>

      {/* Cover */}
      <div className="absolute inset-0 rounded-r-xl rounded-l-md shadow-2xl shadow-black/50 overflow-hidden bg-magic-card border-l-4 border-white/10">
        <img src={img} alt={title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" draggable="false" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 text-left">
          <h3 className="text-2xl font-black text-white leading-tight mb-2 drop-shadow-md font-serif">{title}</h3>
          <p className="text-white/80 font-bold text-sm">by {author}</p>
        </div>

        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>

        {/* Magic Hover Sparkles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <i className="fa-solid fa-sparkles text-yellow-300 absolute top-4 right-4 text-2xl animate-spin-slow"></i>
          <i className="fa-solid fa-star text-white absolute bottom-20 right-8 text-xl animate-bounce"></i>
        </div>
      </div>
    </div>
  </div>
);

export const BookGallery: React.FC<{ onBookClick?: () => void }> = ({ onBookClick }) => {

  const { t } = useLanguage();

  // Embla Carousel Setup with AutoPlay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false, dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false, rootNode: (emblaRoot) => emblaRoot.parentElement })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const recentBooks = [
    { title: "The Forest Adventure", author: "Jake Bell", img: "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Forest%20Adventure%20boy%20and%20girl%20hiking%20cartoon%20pixar%20style?width=400&height=600&nologo=true", color: "bg-green-600" },
    { title: "An Amazing Adventure", author: "Emma C.", img: "https://image.pollinations.ai/prompt/children%20book%20cover%20An%20Amazing%20Adventure%20hiking%20map%20cartoon%20pixar%20style?width=400&height=600&nologo=true", color: "bg-blue-500" },
    { title: "The Spooky Forest", author: "Ray J.", img: "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Spooky%20Forest%20halloween%20pumpkins%20kids%20cartoon%20pixar%20style?width=400&height=600&nologo=true", color: "bg-purple-900" },
    { title: "The Enchanted Castle", author: "Ray J.", img: "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Enchanted%20Castle%20magic%20kids%20torch%20cartoon%20pixar%20style?width=400&height=600&nologo=true", color: "bg-indigo-800" },
    { title: "The Mysterious Cave", author: "Sara Warner", img: "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Mysterious%20Cave%20kids%20lantern%20cartoon%20pixar%20style?width=400&height=600&nologo=true", color: "bg-orange-800" },
    { title: "The Animal Friends", author: "Ray J.", img: "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Animal%20Friends%20girl%20dog%20rabbit%20raccoon%20cartoon%20pixar%20style?width=400&height=600&nologo=true", color: "bg-yellow-500" },
    { title: "The Curious Cat", author: "Sara Warner", img: "https://image.pollinations.ai/prompt/children%20book%20cover%20The%20Curious%20Cat%20boy%20lantern%20white%20cat%20night%20cartoon%20pixar%20style?width=400&height=600&nologo=true", color: "bg-blue-900" },
  ];

  return (
    <div className="w-full max-w-7xl mb-24 px-4 relative animate-fade-in">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Discover Magic Created by Other Parents</h2>
        <p className="text-gray-400 font-bold">{t('gallery_subtitle')}</p>
      </div>

      <div className="relative group/gallery">
        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-magic-surface text-white rounded-full shadow-lg border border-white/10 flex items-center justify-center hover:scale-110 hover:bg-magic-orange active:scale-95 transition-all"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-magic-surface text-white rounded-full shadow-lg border border-white/10 flex items-center justify-center hover:scale-110 hover:bg-magic-orange active:scale-95 transition-all"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Embla Viewport */}
        <div className="overflow-hidden py-8 mask-linear-fade" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {recentBooks.map((book, idx) => (
              <div key={idx} className="flex-[0_0_auto] pl-4">
                <BookCard {...book} onClick={onBookClick || (() => { })} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
