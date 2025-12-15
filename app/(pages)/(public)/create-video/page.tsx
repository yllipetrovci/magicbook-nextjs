'use client'
import React, { useState, useRef, useEffect } from 'react';
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
    const { addVideo } = useStory();
    const { t } = useLanguage();
    const [photo1, setPhoto1] = useState<string | null>(null);
    const [photo2, setPhoto2] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>('hero');
    const [isProcessing, setIsProcessing] = useState(false);

    const { register, watch } = useForm<CreateVideoForm>();
    const customRoleValue = watch('customRole');

    const fileInput1Ref = useRef<HTMLInputElement>(null);
    const fileInput2Ref = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPhoto: (s: string | null) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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
                thumbnail: photo1 || "https://picsum.photos/600/400", // Fallback to upload or generic
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

                {/* Left Column: Uploads */}
                <div className="bg-magic-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-camera text-magic-green"></i> 1. Upload Photos
                    </h3>

                    <div className="flex items-center gap-3 mb-8 bg-green-500/10 border border-green-500/20 rounded-xl p-3 w-full">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <i className="fa-solid fa-shield-heart text-green-400 text-lg"></i>
                        </div>
                        <div className="text-left">
                            <p className="text-green-400 font-bold text-sm">All photos are 100% Safe & Private</p>
                            <p className="text-gray-400 text-xs">Your photos are processed securely and never shared.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Photo 1 (Main) */}
                        <div>
                            <label className="block text-gray-300 font-bold mb-2">{t('cv_upload_1')}</label>
                            <div
                                onClick={() => fileInput1Ref.current?.click()}
                                className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${photo1 ? 'border-magic-green bg-black' : 'border-white/20 hover:border-white/50 bg-white/5'}`}
                            >
                                {photo1 ? (
                                    <>
                                        <img src={photo1} alt="Main" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <i className="fa-solid fa-pen text-white text-2xl"></i>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-4">
                                        <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-500 mb-2"></i>
                                        <p className="text-sm text-gray-400">Click to upload main photo</p>
                                    </div>
                                )}
                                <input type="file" ref={fileInput1Ref} onChange={(e) => handleFileChange(e, setPhoto1)} accept="image/*" className="hidden" />
                            </div>
                        </div>

                        {/* Photo 2 (Optional) */}
                        <div>
                            <label className="block text-gray-300 font-bold mb-2">{t('cv_upload_2')}</label>
                            <div
                                onClick={() => fileInput2Ref.current?.click()}
                                className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${photo2 ? 'border-magic-green bg-black' : 'border-white/20 hover:border-white/50 bg-white/5'}`}
                            >
                                {photo2 ? (
                                    <>
                                        <img src={photo2} alt="Secondary" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <i className="fa-solid fa-pen text-white text-2xl"></i>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-4">
                                        <i className="fa-solid fa-plus text-3xl text-gray-500 mb-2"></i>
                                        <p className="text-sm text-gray-400">Add another photo (optional)</p>
                                    </div>
                                )}
                                <input type="file" ref={fileInput2Ref} onChange={(e) => handleFileChange(e, setPhoto2)} accept="image/*" className="hidden" />
                            </div>
                        </div>
                    </div>
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
                    disabled={!photo1}
                    fullWidth
                    size="lg"
                    className={`text-xl py-4 shadow-xl ${!photo1 ? 'opacity-50 cursor-not-allowed' : 'bg-magic-green hover:bg-green-600 shadow-green-500/30 animate-pulse'}`}
                >
                    {t('cv_btn_create')} <i className="fa-solid fa-wand-magic-sparkles ml-2"></i>
                </Button>
                {!photo1 && <p className="text-center text-red-400 mt-2 font-bold text-sm">Please upload at least one photo.</p>}
            </div>

        </div>
    );
};

export default CreateVideo;