
"use client"
import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface TestimonialsProps {
    variant?: 'full' | 'compact';
    className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ variant = 'full', className = '' }) => {
    const { t } = useLanguage();

    const testimonials = [
        { id: 1, text: "My daughter couldn’t stop reading her story. It was pure magic! The details were incredible.", author: "Sarah T.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 2, text: "The illustrations are beautiful. Absolutely worth every penny. A keepsake we will cherish.", author: "Mark R.", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 3, text: "Perfect for bedtime. My kids love seeing themselves as heroes in their own adventures.", author: "Anna K.", image: "https://randomuser.me/api/portraits/women/65.jpg" },
        { id: 4, text: "A magical gift that keeps on giving. Highly recommended for any parent.", author: "James L.", image: "https://randomuser.me/api/portraits/men/86.jpg" },
        { id: 5, text: "I've never seen my son so excited to read! The personalization is spot on.", author: "Emily W.", image: "https://randomuser.me/api/portraits/women/12.jpg" },
        { id: 6, text: "The quality of the story and art is superb. 10/10 would buy again.", author: "David M.", image: "https://randomuser.me/api/portraits/men/54.jpg" }
    ];

    // Duplicate for infinite scroll loop
    const displayTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <div className={`w-full max-w-[100vw] mb-16 mx-auto overflow-hidden ${className}`}>
            {variant === 'full' && (
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-magic-purple"></div>
                    <h2 className="text-3xl md:text-4xl font-black text-white text-center drop-shadow-lg tracking-tight">
                        {t('test_title')}
                    </h2>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-magic-purple"></div>
                </div>
            )}

            <div className="relative w-full mask-linear-fade">
                <div className="flex gap-8 animate-marquee w-max py-4 hover:[animation-play-state:paused] items-stretch">
                    {displayTestimonials.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className={`w-[280px] md:w-[320px] min-h-[420px] bg-magic-card/60 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/10 flex flex-col justify-between items-start text-left relative hover:border-magic-purple/50 transition-all hover:-translate-y-1 group flex-shrink-0 select-none ${variant === 'compact' ? 'shadow-lg scale-90' : ''}`}
                        >
                            {/* Quote Icon - Bottom Right */}
                            {variant === 'full' && (
                                <div className="absolute bottom-6 right-6 text-6xl text-magic-purple/10 z-0 rotate-12 group-hover:text-magic-purple/20 transition-colors">
                                    <i className="fa-solid fa-quote-right"></i>
                                </div>
                            )}

                            <div className="relative z-10 w-full flex flex-col gap-6">
                                {/* Author Header */}
                                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                                    <div className="w-14 h-14 rounded-full p-0.5 border-2 border-magic-purple/30 overflow-hidden shadow-lg flex-shrink-0">
                                        <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg leading-tight">{item.author}</h4>
                                        <div className="flex gap-1 text-yellow-400 text-xs mt-1">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <i key={i} className="fa-solid fa-star drop-shadow-sm"></i>
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-green-400 font-bold mt-1 block flex items-center gap-1"><i className="fa-solid fa-check-circle"></i> Verified Buyer</span>
                                    </div>
                                </div>

                                {/* Text */}
                                <p className="text-gray-200 italic font-medium leading-relaxed text-lg">"{item.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
