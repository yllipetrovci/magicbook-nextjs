
'use client'

import { Button } from "@/app/components";
import { STEPS_PATHS } from "@/app/constants/relativeRoutePaths";
import { useStory } from "@/app/contexts/StoryContext";
import { playMagicSound } from "@/app/utils/audio";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroUpload() {
    const { updateConfig, config } = useStory();
    const router = useRouter();
    const [includeParent, setIncludeParent] = useState(config.includeParent || false);
    const [localName, setLocalName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [processingTarget, setProcessingTarget] = useState<'hero' | 'parent' | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const parentFileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState(config.heroImage || null);
    const [parentPreview, setParentPreview] = useState<string | null>(config.parentImage || null);

    console.log({config});

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'parent') => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file, target);
        }
    };

    const handleDrop = (e: React.DragEvent, target: 'hero' | 'parent') => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file, target);
        }
    };

    const handleUploadContinue = () => {
        playMagicSound();
        // setStep('gender');
        router.push(STEPS_PATHS.STEP_4);
    };

    const processFile = (file: File, target: 'hero' | 'parent') => {
        setProcessingTarget(target);
        // console.log("Processing file for:", target);
        // Simulate AI Magic Processing
        setTimeout(() => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (target === 'hero') {
                    setPreview(result);
                    updateConfig('heroImage', result);
                    // updateConfig('isAvatar', false);
                } else {
                    setParentPreview(result);
                    updateConfig('parentImage', result);
                }
                setProcessingTarget(null);
            };
            reader.readAsDataURL(file);
        }, 2500); // 2.5s delay for "Magic" effect
    };

    return (<div key="upload" className={`w-full ${includeParent ? 'max-w-4xl' : 'max-w-xl'} animate-slide-up-fade mb-10`}>
        <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 drop-shadow-lg">
            {includeParent ? `Let's see ${localName} & ${relationship}'s smiles! 📸` : `Let's see ${localName}'s magical smile! 📸`}
        </h2>
        <p className="text-xl text-gray-400 text-center mb-6">
            {includeParent ? "Upload photos to create your magical avatars." : "We'll use a sprinkle of AI dust to transform this photo into a storybook character."}
        </p>

        <div className="flex items-center justify-center gap-3 mb-8 bg-green-500/10 border border-green-500/20 rounded-2xl px-6 py-3 w-fit mx-auto shadow-lg shadow-green-900/10">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-shield-heart text-green-400 text-lg"></i>
            </div>
            <div className="text-left">
                <p className="text-green-400 font-black text-sm uppercase tracking-wide">All Photos are 100% Safe & Private</p>
                <p className="text-gray-400 text-xs font-semibold">Images are used only for magic & deleted immediately.</p>
            </div>
        </div>

        <div className={`grid grid-cols-1 ${includeParent ? 'md:grid-cols-2' : ''} gap-6`}>

            {/* Hero Upload Box */}
            <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden flex flex-col">
                <h3 className="text-white font-bold mb-4 text-center text-xl flex items-center justify-center gap-2">
                    <i className="fa-solid fa-user-astronaut text-magic-orange"></i> {localName}
                </h3>
                {processingTarget === 'hero' ? (
                    <div className="w-full aspect-[4/3] rounded-2xl bg-black/50 flex flex-col items-center justify-center border-4 border-magic-purple/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/20 via-transparent to-magic-blue/20 animate-pulse"></div>
                        <div className="w-24 h-24 mb-6 relative">
                            <i className="fa-solid fa-wand-magic-sparkles text-6xl text-magic-purple absolute inset-0 animate-wiggle z-10"></i>
                            <i className="fa-solid fa-star text-3xl text-yellow-400 absolute -top-2 -right-2 animate-spin-slow"></i>
                        </div>
                        <p className="text-magic-purple font-bold">Scanning...</p>
                    </div>
                ) : (
                    <div
                        onClick={() => !preview && fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, 'hero')}
                        className={`w-full aspect-[4/3] rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group ${preview ? 'border-magic-green/50 bg-black' : 'border-white/10 hover:border-magic-orange/50 hover:bg-white/5'}`}
                    >
                        {preview ? (
                            <>
                                <img src={preview} alt="Hero" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => fileInputRef.current?.click()} className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold shadow-xl border border-white/20 hover:bg-black/70 transition-colors">
                                        <i className="fa-solid fa-camera mr-2"></i> Change
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-magic-surface rounded-full flex items-center justify-center text-3xl text-gray-500 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                </div>
                                <p className="text-lg font-bold text-white mb-1">Upload Photo</p>
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e, 'hero')}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                )}
            </div>

            {/* Parent Upload Box */}
            {includeParent && (
                <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden flex flex-col">
                    <h3 className="text-white font-bold mb-4 text-center text-xl flex items-center justify-center gap-2">
                        <i className="fa-solid fa-user-group text-magic-purple"></i> {relationship}
                    </h3>
                    {processingTarget === 'parent' ? (
                        <div className="w-full aspect-[4/3] rounded-2xl bg-black/50 flex flex-col items-center justify-center border-4 border-magic-purple/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/20 via-transparent to-magic-blue/20 animate-pulse"></div>
                            <div className="w-24 h-24 mb-6 relative">
                                <i className="fa-solid fa-wand-magic-sparkles text-6xl text-magic-purple absolute inset-0 animate-wiggle z-10"></i>
                                <i className="fa-solid fa-star text-3xl text-yellow-400 absolute -top-2 -right-2 animate-spin-slow"></i>
                            </div>
                            <p className="text-magic-purple font-bold">Scanning...</p>
                        </div>
                    ) : (
                        <div
                            onClick={() => !parentPreview && parentFileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, 'parent')}
                            className={`w-full aspect-[4/3] rounded-2xl border-4 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group ${parentPreview ? 'border-magic-green/50 bg-black' : 'border-white/10 hover:border-magic-purple/50 hover:bg-white/5'}`}
                        >
                            {parentPreview ? (
                                <>
                                    <img src={parentPreview} alt="Parent" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => parentFileInputRef.current?.click()} className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold shadow-xl border border-white/20 hover:bg-black/70 transition-colors">
                                            <i className="fa-solid fa-camera mr-2"></i> Change
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-magic-surface rounded-full flex items-center justify-center text-3xl text-gray-500 mb-4 group-hover:scale-110 transition-transform shadow-inner">
                                        <i className="fa-solid fa-cloud-arrow-up"></i>
                                    </div>
                                    <p className="text-lg font-bold text-white mb-1">Upload Photo</p>
                                </>
                            )}
                            <input
                                type="file"
                                ref={parentFileInputRef}
                                onChange={(e) => handleFileChange(e, 'parent')}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    )}
                </div>
            )}

        </div>

        <div className="flex gap-4 mt-8 max-w-lg mx-auto">
            <Button variant="ghost" onClick={router.back} disabled={processingTarget !== null} className="flex-1 text-gray-400 hover:text-white">Back</Button>

            <Button
                onClick={handleUploadContinue}
                className="flex-[2] shadow-lg shadow-green-500/20 bg-magic-green hover:bg-green-600"
                size="lg"
                variant="transparent"
                disabled={processingTarget !== null && preview !== ''}
            >
                Continue <i className="fa-solid fa-check ml-2"></i>
            </Button>
        </div>
    </div>)
}