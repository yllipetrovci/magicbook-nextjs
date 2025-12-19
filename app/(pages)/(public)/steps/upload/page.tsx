
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { PhotoUploadSection } from '@/app/components/PhotoUploadSection';
import { playMagicSound } from '@/app/utils/audio';
import { STEPS_PATHS } from '@/app/constants/relativeRoutePaths';

export const HeroSelection: React.FC = () => {
    const router = useRouter();
    const { updateConfig, config } = useStory();
    const [localName, setLocalName] = useState(config.heroName || '');
    const [relationship, setRelationship] = useState(config.parentRelationship || 'Mom');
    const [includeParent, setIncludeParent] = useState(config.includeParent || false);

    // Upload Handlers
    const handleHeroImageUpdate = (optimized: string, original: string) => {
        console.log('handleHeroImageUpdate', optimized, original);
        updateConfig('heroImage', optimized);
        updateConfig('heroImageOriginal', original);
        updateConfig('isAvatar', false);
    };

    const handleParentImageUpdate = (optimized: string, original: string) => {
        updateConfig('parentImage', optimized);
        updateConfig('parentImageOriginal', original);
    };

    //TODO: need to be removed
    const handleSkipUpload = () => {
        // setStep('gender');
    };

    const handleUploadContinue = () => {
        router.push(STEPS_PATHS.STEP_3);

    };



    const toggleIncludeParent = () => {
        playMagicSound();
        setIncludeParent(!includeParent);
    };

    return (
        <div className="flex flex-col items-center min-h-[60vh] w-full">
            <div className="flex flex-col items-center justify-center px-4 max-w-5xl mx-auto py-8 w-full mb-12">


                <PhotoUploadSection
                    heroName={localName}
                    includeParent={includeParent}
                    relationship={relationship}
                    initialHeroImage={config.heroImage}
                    initialParentImage={config.parentImage}
                    onHeroImageUpdate={handleHeroImageUpdate}
                    onParentImageUpdate={handleParentImageUpdate}
                    onBack={() => router.back()}
                    onNext={handleUploadContinue}
                    onSkip={handleSkipUpload}
                />
            </div>
        </div>
    );
};


export default HeroSelection;