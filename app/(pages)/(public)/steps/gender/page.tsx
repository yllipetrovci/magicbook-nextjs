import { Button } from "@/app/components";
import { useStory } from "@/app/contexts/StoryContext";
import { playMagicSound } from "@/app/utils/audio";
import { useState } from "react";

// Specific 3D Avatar URLs matching the user's provided images
const BOY_AVATAR = "https://image.pollinations.ai/prompt/cute%203d%20cartoon%20boy%20close%20up%20portrait%20brown%20messy%20hair%20brown%20eyes%20smiling%20wearing%20orange%20t-shirt%20white%20background%20pixar%20style%20soft%20lighting?width=800&height=800&nologo=true";
const GIRL_AVATAR = "https://image.pollinations.ai/prompt/cute%203d%20cartoon%20girl%20close%20up%20portrait%20red%20hair%20green%20eyes%20smiling%20wearing%20yellow%20shirt%20blue%20overalls%20white%20background%20pixar%20style%20soft%20lighting?width=800&height=800&nologo=true";

export default function GenderPage() {
    const { updateConfig, config } = useStory();
    const [localName, setLocalName] = useState(config.heroName || '');
    const [gender, setGender] = useState<'boy' | 'girl' | null>(null);
    const [preview, setPreview] = useState<string | null>(config.heroImage || null);

    const handleGenderSelect = (gender: 'boy' | 'girl') => {
        playMagicSound();
        updateConfig('gender', gender);
        // Only set avatar image if one wasn't uploaded (preview is null)
        if (!preview) {
            updateConfig('isAvatar', true);
            updateConfig('heroImage', gender === 'boy' ? BOY_AVATAR : GIRL_AVATAR);
        }

        // Move to next page (Adventure)
        // router.push('/adventure');
    };

    return (<div key="gender" className="w-full max-w-3xl animate-slide-up-fade">
        <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 drop-shadow-lg">
            Choose {localName}'s Enchanted Look
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">Who will act as our brave adventurer?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boy Card */}
            <button
                onClick={() => handleGenderSelect('boy')}
                className="bg-magic-card p-8 rounded-3xl border-2 border-white/5 hover:border-magic-blue hover:shadow-2xl hover:shadow-blue-500/20 transition-all group flex flex-col items-center relative overflow-visible"
            >
                <div className="w-40 h-40 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border-4 border-magic-blue/30 relative overflow-visible shadow-2xl">
                    {/* Crown Overlay */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                        <i className="fa-solid fa-crown text-5xl text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-bounce-slow"></i>
                    </div>
                    <img
                        src={BOY_AVATAR}
                        alt="Boy"
                        className="w-full h-full rounded-full object-cover relative z-10 border-2 border-white/10"
                    />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 group-hover:text-magic-blue transition-colors">Boy</h3>
                <p className="text-gray-400 font-semibold">Create an adventure for him</p>
            </button>

            {/* Girl Card */}
            <button
                onClick={() => handleGenderSelect('girl')}
                className="bg-magic-card p-8 rounded-3xl border-2 border-white/5 hover:border-magic-pink hover:shadow-2xl hover:shadow-pink-500/20 transition-all group flex flex-col items-center relative overflow-visible"
            >
                <div className="w-40 h-40 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border-4 border-magic-pink/30 relative overflow-visible shadow-2xl">
                    {/* Crown Overlay */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                        <i className="fa-solid fa-crown text-5xl text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-bounce-slow"></i>
                    </div>
                    <img
                        src={GIRL_AVATAR}
                        alt="Girl"
                        className="w-full h-full rounded-full object-cover relative z-10 border-2 border-white/10"
                    />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 group-hover:text-magic-pink transition-colors">Girl</h3>
                <p className="text-gray-400 font-semibold">Create an adventure for her</p>
            </button>
        </div>

        <div className="mt-12 text-center">
            <Button variant="ghost" onClick={() => {
                // setStep('upload')
                // router.push('/upload');
            }} className="text-gray-400 hover:text-white">
                <i className="fa-solid fa-arrow-left mr-2"></i> Back to Upload
            </Button>
        </div>
    </div>
    )
}