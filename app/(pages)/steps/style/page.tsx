'use client'
import { STEPS_PATHS } from "@/app/constants/stepsPaths";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useStory } from "@/app/contexts/StoryContext";
import { playMagicSound } from "@/app/utils/audio";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BOOK_STYLES = [
    { id: 'fantasy', label: 'Fantasy Epic', img: 'https://image.pollinations.ai/prompt/epic%20fantasy%20book%20illustration%20dragon%20mountain?width=250&height=250&nologo=true' },
    { id: 'royal', label: 'Royal / Fairytale', img: 'https://image.pollinations.ai/prompt/royal%20fairytale%20castle%20golden%20sparkles%20illustration?width=250&height=250&nologo=true' },
    { id: 'minimal', label: 'Minimal Modern', img: 'https://image.pollinations.ai/prompt/minimalist%20modern%20vector%20art%20children%20book%20clean?width=250&height=250&nologo=true' },
    { id: 'watercolor', label: 'Watercolor', img: 'https://image.pollinations.ai/prompt/soft%20watercolor%20painting%20children%20story%20dreamy?width=250&height=250&nologo=true' },
    { id: 'comic', label: 'Comic / Superhero', img: 'https://image.pollinations.ai/prompt/comic%20book%20style%20bold%20lines%20superhero%20action?width=250&height=250&nologo=true' },
    { id: 'cozy', label: 'Cozy', img: 'https://image.pollinations.ai/prompt/cozy%20warm%20autumn%20cottage%20illustration%20detailed?width=250&height=250&nologo=true' },
    { id: '3d', label: '3D Render', img: 'https://image.pollinations.ai/prompt/3d%20render%20cute%20pixar%20style%20character%20bright?width=250&height=250&nologo=true' },
    { id: 'vintage', label: 'Vintage Storybook', img: 'https://image.pollinations.ai/prompt/vintage%20classic%20storybook%20etching%20style%20illustration?width=250&height=250&nologo=true' },
    { id: 'sparkly', label: 'Magical Sparkly', img: 'https://image.pollinations.ai/prompt/magical%20glitter%20sparkle%20fantasy%20illustration%20purple?width=250&height=250&nologo=true' },
    { id: 'anime', label: 'Anime', img: 'https://image.pollinations.ai/prompt/anime%20style%20children%20book%20illustration%20cute%20hero%20vibrant?width=250&height=250&nologo=true' },
    { id: 'pixel', label: 'Pixel Art', img: 'https://image.pollinations.ai/prompt/pixel%20art%20style%20children%20book%20illustration%208bit%20cute?width=250&height=250&nologo=true' },
    { id: 'clay', label: 'Claymation', img: 'https://image.pollinations.ai/prompt/claymation%20style%20children%20book%20illustration%20plasticine%20cute?width=250&height=250&nologo=true' },
];
export default function StylePage() {
    const router = useRouter();
    const { updateConfig, config } = useStory();
    const { t } = useLanguage();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const handleStyleSelect = (styleLabel: string) => {
        playMagicSound();
        updateConfig('coverBorder', styleLabel); // Storing style in 'coverBorder' property
        // setStep('upload');
        router.push(STEPS_PATHS.STEP_5);
    };

    if (!mounted) return null;

    return (
        <div key="style" className="w-full max-w-5xl animate-slide-up-fade">
            <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 drop-shadow-lg">
                {t('stylePage.title')}
            </h2>
            <p className="text-xl text-gray-400 text-center mb-10">{t('stylePage.subtitle')}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {BOOK_STYLES.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => handleStyleSelect(style.label)}
                        className="group relative rounded-3xl overflow-hidden border-2 border-white/10 hover:border-magic-purple transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/20"
                    >
                        <div className="aspect-square w-full relative">
                            <img src={style.img} alt={style.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                                <span className="text-white font-bold text-lg group-hover:text-magic-purple transition-colors">{t(`stylePage.styles.${style.id}`)}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )

}