'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useStory } from '../../../contexts/StoryContext';
import { Button } from '../../../components/Button';
import { GeneratedVideo } from '../../../types';
import { useLanguage } from '@/app/contexts/LanguageContext';

const ROLES = [
    { id: 'hero', icon: 'fa-shield-halved', color: 'text-blue-500', bg: 'bg-blue-500/20' },
    { id: 'prince', icon: 'fa-crown', color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
    { id: 'princess', icon: 'fa-wand-magic-sparkles', color: 'text-pink-500', bg: 'bg-pink-500/20' },
    { id: 'wizard', icon: 'fa-hat-wizard', color: 'text-purple-500', bg: 'bg-purple-500/20' },
    { id: 'fairy', icon: 'fa-feather', color: 'text-green-500', bg: 'bg-green-500/20' },
    { id: 'superhero', icon: 'fa-mask', color: 'text-red-500', bg: 'bg-red-500/20' },
    { id: 'pirate', icon: 'fa-skull-crossbones', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    { id: 'astronaut', icon: 'fa-rocket', color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
    { id: 'custom', icon: 'fa-pen-fancy', color: 'text-white', bg: 'bg-white/10' },
];

interface CreateVideoForm {
    customRole: string;
}

export const CreateVideo: React.FC = () => {
    const router = useRouter();
    const { stories } = useStory(); //addVideo, 

    const addVideo = (video: GeneratedVideo) => {
        // Placeholder function to avoid errors
    }
    const { t } = useLanguage();
    const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
    const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
    const [selectedRole, setSelectedRole] = useState<string>('hero');
    const [isProcessing, setIsProcessing] = useState(false);

    const { register, watch } = useForm<CreateVideoForm>();
    const customRoleValue = watch('customRole');

    const selectedStory = stories.find(story => story.id === selectedStoryId) || null;
    const selectedPage = selectedStory?.pages?.[selectedPageIndex];
    const selectedImage = selectedPage?.image || selectedStory?.coverImage || "";

    const handleGenerate = () => {
        setIsProcessing(true);

        // Determine title based on role
        let roleDisplay = selectedRole;
        if (selectedRole === 'custom') {
            roleDisplay = customRoleValue?.trim() || "Hero";
        }

        // Simulate Video Generation Process
        setTimeout(() => {
            const newVideo: GeneratedVideo = {
                id: `v_${Date.now()}`,
                title: `The ${roleDisplay.charAt(0).toUpperCase() + roleDisplay.slice(1)}'s Journey`,
                thumbnail: selectedImage || "https://picsum.photos/600/400",
                videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Demo video
                date: new Date().toISOString(),
                duration: "1:30"
            };

            addVideo(newVideo);
            setIsProcessing(false);
            router.push('/dashboard');
        }, 4000);
    };

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                <div className="relative mb-8">
                    <div className="w-32 h-32 rounded-full border-4 border-magic-green/30 animate-spin-slow"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-magic-green animate-pulse">
                        <i className="fa-solid fa-video"></i>
                    </div>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">{t('cv_processing')}</h2>
                <p className="text-gray-400">Rendering magical scenes...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 max-w-5xl mx-auto w-full">

            <div className="flex items-center gap-4 mb-8 self-start w-full">
                <Button variant="ghost" onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white">
                    <i className="fa-solid fa-arrow-left mr-2"></i> {t('dash_dashboard') || "Back"}
                </Button>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{t('cv_title')}</h1>
                <p className="text-xl text-gray-400">{t('cv_subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-12">

                {/* Left Column: Story Reference */}
                <div className="bg-magic-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-book-open text-magic-green"></i> 1. Choose Story Page
                    </h3>

                    <div className="flex items-center gap-3 mb-8 bg-green-500/10 border border-green-500/20 rounded-xl p-3 w-full">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <i className="fa-solid fa-shield-heart text-green-400 text-lg"></i>
                        </div>
                        <div className="text-left">
                            <p className="text-green-400 font-bold text-sm">Use your story as the video reference</p>
                            <p className="text-gray-400 text-xs">Pick a story and the exact page to animate.</p>
                        </div>
                    </div>

                    {stories.length === 0 ? (
                        <div className="text-center text-gray-400 bg-white/5 border border-white/10 rounded-xl p-6">
                            You don’t have any stories yet. Create one first.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 font-bold mb-2">Story</label>
                                <select
                                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
                                    value={selectedStoryId ?? ""}
                                    onChange={(e) => {
                                        setSelectedStoryId(e.target.value || null);
                                        setSelectedPageIndex(0);
                                    }}
                                >
                                    <option value="">Select a story</option>
                                    {stories.map((story) => (
                                        <option key={story.id ?? story.title} value={story.id ?? ""}>
                                            {story.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 font-bold mb-2">Page</label>
                                <select
                                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
                                    value={selectedPageIndex}
                                    onChange={(e) => setSelectedPageIndex(Number(e.target.value))}
                                    disabled={!selectedStory}
                                >
                                    {selectedStory?.pages?.map((page, idx) => (
                                        <option key={`${selectedStory.id ?? selectedStory.title}-${idx}`} value={idx}>
                                            Page {idx + 1}{page?.text ? ` — ${page.text.slice(0, 30)}...` : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="aspect-video rounded-xl border border-white/10 overflow-hidden bg-black/40 flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected page" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-500 text-sm">Select a story page to preview.</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Role Selection */}
                <div className="bg-magic-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <i className="fa-solid fa-user-tag text-magic-purple"></i> 2. {t('cv_role_title')}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                        {ROLES.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${selectedRole === role.id ? 'border-magic-green bg-magic-green/10 shadow-lg shadow-green-500/10' : 'border-white/5 hover:border-white/20 bg-white/5'}`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role.bg} ${role.color} text-2xl`}>
                                    <i className={`fa-solid ${role.icon}`}></i>
                                </div>
                                <span className={`font-bold ${selectedRole === role.id ? 'text-white' : 'text-gray-400'}`}>
                                    {t(`role_${role.id}`) || role.id}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Custom Input */}
                    {selectedRole === 'custom' && (
                        <div className="mt-6 animate-fade-in border-t border-white/10 pt-6">
                            <label className="block text-gray-300 font-bold mb-2">{t('cv_custom_label') || "Describe Role"}</label>
                            <div className="relative">
                                <input
                                    {...register('customRole', { maxLength: 100 })}
                                    placeholder={t('cv_custom_placeholder') || "e.g. Dragon"}
                                    className="w-full p-4 bg-black/40 rounded-xl border border-white/10 focus:border-magic-green outline-none text-white placeholder-gray-600 pr-16"
                                    autoFocus
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono">
                                    {customRoleValue ? customRoleValue.length : 0}/100
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className="w-full max-w-2xl">
                <Button
                    onClick={handleGenerate}
                    disabled={!selectedStoryId || !selectedImage}
                    fullWidth
                    size="lg"
                    className={`text-xl py-4 shadow-xl ${!selectedStoryId || !selectedImage ? 'opacity-50 cursor-not-allowed' : 'bg-magic-green hover:bg-green-600 shadow-green-500/30 animate-pulse'}`}
                >
                    {t('cv_btn_create')} <i className="fa-solid fa-wand-magic-sparkles ml-2"></i>
                </Button>
                {(!selectedStoryId || !selectedImage) && (
                    <p className="text-center text-red-400 mt-2 font-bold text-sm">
                        Please choose a story page to continue.
                    </p>
                )}
            </div>

        </div>
    );
};

export default CreateVideo;
