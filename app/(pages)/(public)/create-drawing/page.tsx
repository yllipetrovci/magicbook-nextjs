
'use client'
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '../../../contexts/StoryContext';
import { Button } from '../../../components/Button';
import { GeneratedImage } from '../../../types';
import { useLanguage } from '@/app/contexts/LanguageContext';

const STYLES = [
    { id: 'simple', icon: 'fa-star', promptMod: 'simple thick lines cute' },
    { id: 'detailed', icon: 'fa-tree', promptMod: 'highly detailed intricate' },
    { id: 'cartoon', icon: 'fa-child', promptMod: 'disney style cartoon' },
    { id: 'anime', icon: 'fa-bolt', promptMod: 'anime chibi style' },
    { id: 'mandala', icon: 'fa-circle-notch', promptMod: 'mandala pattern background' },
];

export const CreateDrawing: React.FC = () => {
    const router = useRouter();
    const { addImage } = useStory();
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string>('simple');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!prompt.trim() && !photo) return;

        setIsProcessing(true);
        setGeneratedImage(null);

        // Get style details
        const styleObj = STYLES.find(s => s.id === selectedStyle) || STYLES[0];

        // Construct a prompt optimized for coloring pages
        // Note: If a photo is provided, we essentially simulate scanning it by using the prompt + "based on reference".
        // In a real implementation with Pollinations, image-to-image requires a URL. 
        // Here we treat the photo as a UI element that enhances the "magic" feeling.

        let basePrompt = prompt.trim() || "A surprise coloring page";
        if (photo) {
            basePrompt += " (based on photo)";
        }

        const coloringPrompt = encodeURIComponent(`coloring book page ${basePrompt} ${styleObj.promptMod} line art black and white simple outlines white background kids drawing no shading`);
        const imageUrl = `https://image.pollinations.ai/prompt/${coloringPrompt}?width=800&height=1000&nologo=true&seed=${Math.random()}`;

        // Simulate loading time for effect, then set image
        setTimeout(() => {
            setGeneratedImage(imageUrl);
            setIsProcessing(false);
        }, 2500);
    };

    const handleSave = () => {
        if (generatedImage) {
            const newImage: GeneratedImage = {
                id: `img_${Date.now()}`,
                title: prompt.slice(0, 30) || "Coloring Page",
                imageUrl: generatedImage,
                date: new Date().toISOString(),
                prompt: prompt
            };
            addImage(newImage);
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-8 self-start w-full">
                <Button variant="ghost" onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white">
                    <i className="fa-solid fa-arrow-left mr-2"></i> {t('dash_dashboard') || "Back"}
                </Button>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{t('cd_title')}</h1>
                <p className="text-xl text-gray-400">{t('cd_subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-12">

                {/* Left Column: Input & Options */}
                <div className="flex flex-col gap-6">

                    {/* Photo Upload Card */}
                    <div className="bg-magic-card p-6 rounded-3xl border border-white/10 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-camera text-magic-blue"></i> {t('cd_upload_title') || "Upload Reference"}
                        </h3>

                        <div className="flex items-center gap-3 mb-4 bg-green-500/10 border border-green-500/20 rounded-xl p-3 w-full">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-shield-heart text-green-400 text-sm"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-green-400 font-bold text-sm">All photos are 100% Safe & Private</p>
                                <p className="text-gray-400 text-xs">Deleted after magic is applied.</p>
                            </div>
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${photo ? 'border-magic-blue bg-black' : 'border-white/20 hover:border-white/50 bg-white/5'}`}
                        >
                            {photo ? (
                                <>
                                    <img src={photo} alt="Ref" className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <i className="fa-solid fa-pen text-white text-2xl"></i>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                                        <i className="fa-solid fa-check text-green-400 mr-1"></i> Reference Ready
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-500 mb-2"></i>
                                    <p className="text-sm text-gray-400">Click to upload photo</p>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                        </div>
                    </div>

                    {/* Style Selection */}
                    <div className="bg-magic-card p-6 rounded-3xl border border-white/10 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-palette text-magic-purple"></i> {t('cd_style_title') || "Choose Style"}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {STYLES.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${selectedStyle === style.id ? 'border-magic-blue bg-magic-blue/10 text-white shadow-lg shadow-blue-500/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    <i className={`fa-solid ${style.icon} text-xl`}></i>
                                    <span className="text-xs font-bold text-center">{t(`style_${style.id}`) || style.id}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Text Input */}
                    <div className="bg-magic-card p-6 rounded-3xl border border-white/10 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-4">Describe your drawing</h3>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={t('cd_placeholder')}
                            className="w-full p-4 bg-black/40 rounded-xl border border-white/10 focus:border-magic-blue outline-none text-white placeholder-gray-500 text-lg h-32 resize-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        />
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isProcessing || (!prompt.trim() && !photo)}
                        size="lg"
                        fullWidth
                        className={`text-xl py-4 shadow-xl ${isProcessing ? 'opacity-70' : 'bg-magic-blue hover:bg-blue-600 shadow-blue-500/20'}`}
                    >
                        {isProcessing ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i> {t('cd_processing')}</> : <>{t('cd_btn_generate')} <i className="fa-solid fa-wand-magic-sparkles ml-2"></i></>}
                    </Button>

                </div>

                {/* Right Column: Result */}
                <div className="flex flex-col items-center justify-start">
                    {/* Magic Canvas Container */}
                    <div className={`w-full max-w-lg aspect-[4/5] rounded-2xl p-4 shadow-2xl relative overflow-hidden flex items-center justify-center border-4 border-white/20 transition-all ${generatedImage ? 'bg-white' : 'bg-magic-card/30 backdrop-blur-3xl'}`}>

                        {/* Default Magic Blur Background */}
                        {!generatedImage && !isProcessing && (
                            <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/20 via-transparent to-magic-blue/20 blur-3xl animate-pulse"></div>
                        )}

                        {/* Empty State Icon */}
                        {!generatedImage && !isProcessing && (
                            <div className="text-center text-white/50 relative z-10">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner">
                                    <i className="fa-regular fa-image text-4xl"></i>
                                </div>
                                <p className="font-bold text-lg drop-shadow-md">Your magic drawing will appear here</p>
                                <p className="text-sm opacity-70 mt-2">Ready to create!</p>
                            </div>
                        )}

                        {/* Processing State */}
                        {isProcessing && (
                            <div className="text-center text-magic-blue relative z-10">
                                {photo && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                                        <img src={photo} className="w-full h-full object-cover blur-md" alt="Ref Blur" />
                                    </div>
                                )}
                                <div className="w-20 h-20 border-4 border-magic-blue border-t-transparent rounded-full animate-spin mx-auto mb-6 relative z-20 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                                <p className="font-black text-2xl text-white animate-pulse drop-shadow-lg">{t('cd_processing')}</p>
                                <p className="text-blue-300 font-bold mt-2">Mixing colors...</p>
                            </div>
                        )}

                        {/* Result Image */}
                        {generatedImage && !isProcessing && (
                            <img src={generatedImage} alt="Generated" className="w-full h-full object-contain border-2 border-black rounded-lg shadow-inner" />
                        )}
                    </div>

                    {generatedImage && !isProcessing && (
                        <div className="mt-8 w-full max-w-lg">
                            <Button onClick={handleSave} size="lg" fullWidth className="bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/20 text-xl py-4 animate-bounce-slow">
                                {t('cd_btn_save')} <i className="fa-solid fa-check ml-2"></i>
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};


export default CreateDrawing;