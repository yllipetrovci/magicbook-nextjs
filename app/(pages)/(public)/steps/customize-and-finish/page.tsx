


"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { StoryConfig } from '@/app/types';
import { playMagicSound } from '@/app/utils/audio';
import { COLORS, COMPANION_PRESETS, FANTASY_LOCATIONS, PAGE_COUNTS, STORY_TONES } from './component-configs';
import { getBorderClass, getCoverImage } from './helpers';
import LivePreview from './components/LivePreview';
import ColorOption from './components/ColorsSection';
import CompanionButton from './components/CompanionPresentCard';
import StoryToneOption from './components/StoryTonesButton';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { STEPS_PATHS } from '@/app/constants/stepsPaths';
import { generateStoryPrompt } from '@/lib/prompts/storyGeneration';
import { characterExtractionPrompt } from '@/lib/prompts/characterExtraction';
import { generatePageImagePrompt } from '@/lib/prompts/pageImageGeneration';


// Yup Validation Schema
// const validationSchema = yup.object({
//     childAge: yup.number()
//         .transform((value) => (isNaN(value) ? undefined : value))
//         .required("Please enter the age")
//         .min(1, "Minimum age is 1")
//         .max(12, "Maximum age is 12"),
//     customPageCount: yup.number()
//         .transform((value) => (isNaN(value) ? undefined : value))
//         .required("Please select page count")
//         .min(3, "Min 3 pages")
//         .max(12, "Max 12 pages"),
//     tone: yup.string().required("Please select a story tone"),
//     place: yup.string().required("Please tell us where the adventure begins"),
//     companions: yup.string().required("Please add at least one companion"),
//     color: yup.string().required("Please choose a magic color"),
//     secretWish: yup.string().optional(), // Made optional
// });
const validationSchema = yup.object({
    childAge: yup.number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required(),
    customPageCount: yup.number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required(),
    tone: yup.string().required(),
    place: yup.string().required(),
    companions: yup.string().required(),
    color: yup.string().required(),

    // 👇 IMPORTANT FIX
    secretWish: yup.string().default('').optional(),
});

type FormData = yup.InferType<typeof validationSchema>;

export default function CustomizeAndFinish() {
    const router = useRouter();
    const { config, updateConfig } = useStory();
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);

    // Initialize form with existing config data and yup resolver
    const { register, handleSubmit, setValue, watch, setFocus, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            ...config,
            childAge: config.childAge || 5,
            customPageCount: config.customPageCount || 6,
            tone: config.tone || 'Fantasy Epic',
            place: config.place || 'The North Pole',
            companions: config.companions || 'Santa\'s Elves',
            color: config.color || 'Magic Purple',
            secretWish: config.secretWish ?? undefined,
        },
        resolver: yupResolver(validationSchema),
        mode: 'onBlur' // Add mode for better validation UX, e.g., validate on blur
    });


    useEffect(() => {
        setMounted(true);

        console.log({ config })

        // const configMock = {
        //     "heroName": "enes",
        //     "isAvatar": false,
        //     "theme": "superhero",
        //     "place": "The Starry Moon Base",
        //     "color": "Pink",
        //     "companions": "a friendly tiny dragon",
        //     "superPower": "",
        //     "secretWish": "hello",
        //     "email": "yllipetrovci@gmail.com",
        //     "planType": "unlimited",
        //     "archetype": "royal",
        //     "tone": "Animal Friends",
        //     "childAge": 5,
        //     "customPageCount": 6,
        //     "coverBorder": "Minimal Modern",
        //     "parentRelationship": "Mom",
        //     "includeParent": false,
        //     "parentImage": null,
        //     "heroImage": "data:image/jpeg;base64,/9j/4AAQSkZJR"

        // }

        const characterLook = `warm-toned young person with short dark hair, neatly 
            shaped eyebrows, trimmed facial hair, and wearing a textured green turtleneck sweater`;


        const generateStoryConfigs: any = {
            characterLook,
            heroName: config.heroName,
            style: config.coverBorder,
            theme: config?.theme,
            tone: config?.tone,
            characterType: config?.archetype,
            childAge: config?.childAge,
            pageCount: config?.customPageCount,
            location: config?.place,
            companions: config?.companions,
            secretWish: config.secretWish
        }

        // const { system, user } = generateStoryPrompt(generateStoryConfigs);
        // const response = characterExtractionPrompt();

        const response = generatePageImagePrompt({
            characterLook,
            style: generateStoryConfigs.style,
            theme: generateStoryConfigs.theme,
            tone: generateStoryConfigs.tone,
            characterType: generateStoryConfigs.characterType,
            companions: generateStoryConfigs.companions,
            childAge: generateStoryConfigs.childAge,
            secretWish: generateStoryConfigs.secretWish,
            imageAltText:
                "The tiny dragon curiously peers into the window of the moon base, seeing Enes inside. They make eye contact.",

            // "In a hidden moon crater, a tiny, emerald-green dragon with friendly eyes practices making small, glittery puffs of light with its breath.",
            // "Inside the base, Prince Enes, a small boy in a simple silver cape, looks wistfully out a large window at the passing stars.",
            // "Enes and the tiny dragon sit together on a ledge, sharing moonberries. They are both smiling, looking at friendly alien animal shapes in the stars.",
            // "A wide, peaceful view of the Starry Moon Base, glowing softly against the black velvet of space, with Earth a blue marble in the distance.",
            // "The tiny dragon uses its sparkle-breath to repair a broken communication dish on the base's roof, sending a ripple of light into space.",
            mainCharacterIncluded: true
        });

        console.log({
            SYSTEM_PROMPT: response.system,
            USER_PROMPT: response.user
        })

        // console.log(JSON.stringify({
        //     SYSTEM_PROMPT: response.system,
        //     USER_PROMPT: response.user
        // }))

        // console.log({ system, user });
    }, []);


    // Watch fields to update UI immediately
    const watchedTone = watch('tone');
    // const watchedBorder = watch('coverBorder'); // This holds the Book Style label selected in previous step
    const watchedColor = watch('color');
    const watchedPlace = watch('place');
    const watchedCompanions = watch('companions');
    const watchedWish = watch('secretWish');

    const onNext = (data: any) => {
        playMagicSound();
        // Update global context with all form data
        Object.keys(data).forEach(key => {
            updateConfig(key as keyof StoryConfig, data[key as keyof StoryConfig]);
        });
        router.push(STEPS_PATHS.STEP_7);
        // router.push('/generating');


    };

    const handleRandomMap = () => {
        playMagicSound();
        const random = FANTASY_LOCATIONS[Math.floor(Math.random() * FANTASY_LOCATIONS.length)];
        setValue('place', random, { shouldValidate: true, shouldDirty: true });
    };

    const handlePresetMap = (place: string) => {
        playMagicSound();
        setValue('place', place, { shouldValidate: true, shouldDirty: true });
    };

    const handleCompanionAdd = (text: string) => {
        playMagicSound();
        setValue('companions', text, { shouldValidate: true, shouldDirty: true });
    };

    const handleFriendAdd = () => {
        playMagicSound();
        setFocus('companions');
    };

    const heroName = config.heroName || 'The Hero';
    const coverImageSrc = getCoverImage(config.theme);
    // Default to Fantasy Epic if not set
    const borderClass = getBorderClass(config.coverBorder || 'Fantasy Epic');

    // Check for special themes (like Santa) that require fewer inputs
    const isSimplifiedTheme = true;
    // mounted && config.theme?.toLowerCase().includes("santa");

    // Auto-fill hidden fields for simplified themes if they are empty
    useEffect(() => {
        if (isSimplifiedTheme) {
            if (!watchedPlace) setValue('place', 'The North Pole');
            if (!watchedCompanions) setValue('companions', 'Santa\'s Elves');
        }
    }, [isSimplifiedTheme, setValue, watchedPlace, watchedCompanions]);

    if (!mounted) return null;

    return (
        <div className="flex flex-col items-center min-h-[60vh] px-4 py-8 w-full max-w-7xl mx-auto">

            {/* NEW STEPPER COMPONENT */}

            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black text-magic-purple mb-2 tracking-tight drop-shadow-lg">
                    {isSimplifiedTheme ? `A Magical Letter to Santa` : `Let's sprinkle some magic details for ${heroName}! ✨`}
                </h2>
                <p className="text-xl text-gray-300 font-bold bg-magic-card/50 border border-white/10 px-6 py-2 rounded-full inline-block shadow-lg">
                    ✨ {isSimplifiedTheme ? "Custom Special Adventure" : t('det_badge')} ✨
                </p>
            </div>

            <form onSubmit={handleSubmit(onNext)} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* Left Column: Form Fields (9/12) */}
                <div className="lg:col-span-9 space-y-8 order-2 lg:order-1">

                    {/* NEW: Age & Pages Section */}
                    <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10">
                        <label className="text-white font-bold text-lg mb-4 block">
                            <i className="fa-solid fa-child-reaching text-magic-blue mr-2"></i> {t('customizeAndFinishPage.detReaderDetails')}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-bold mb-2">{t('customizeAndFinishPage.detAgeLabel')}</label>
                                <input
                                    type="number"
                                    {...register('childAge')}
                                    className={`w-full p-4 bg-black/40 rounded-xl border ${errors.childAge ? 'border-red-500' : 'border-white/10'} focus:border-magic-blue outline-none text-white placeholder-gray-600 text-center text-xl font-bold`}
                                    placeholder={t('customizeAndFinishPage.detAgePlaceholder')}
                                    min={1}
                                    max={12}
                                />
                                {errors.childAge && <p className="text-red-400 text-sm mt-2 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.childAge.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-bold mb-2">{t('customizeAndFinishPage.detPagesLabel')}</label>
                                <div className="relative">
                                    <select
                                        {...register('customPageCount')}
                                        className={`w-full p-4 bg-black/40 rounded-xl border ${errors.customPageCount ? 'border-red-500' : 'border-white/10'} focus:border-magic-blue outline-none text-white text-xl font-bold appearance-none cursor-pointer`}
                                    >
                                        {PAGE_COUNTS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                                {errors.customPageCount && <p className="text-red-400 text-sm mt-2 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.customPageCount.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Story Tones Section */}
                    <div className="w-full">
                        <h3 className="text-white font-bold text-lg mb-4 ml-2"><i className="fa-solid fa-wand-magic-sparkles text-magic-pink mr-2"></i> {t('customizeAndFinishPage.detToneLabel')}</h3>
                        <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10 relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {STORY_TONES.map((storyTone) => (
                                    <StoryToneOption key={storyTone.id} tone={storyTone} watchedTone={watchedTone as string} onClick={playMagicSound} register={register} />
                                ))}
                            </div>
                            {errors.tone && <p className="text-red-400 text-sm mt-3 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.tone.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Basic Details */}
                        <div className="space-y-6">
                            <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10">
                                <label className="text-white font-bold text-lg mb-4 block"><i className="fa-solid fa-map-location-dot text-magic-blue mr-2"></i> {t('customizeAndFinishPage.detBeginLabel')}</label>
                                <div className="relative">
                                    <input
                                        {...register('place')}
                                        className={`w-full p-4 bg-black/40 rounded-xl border ${errors.place ? 'border-red-500' : 'border-white/10'} focus:border-magic-blue outline-none text-white placeholder-gray-600`}
                                        placeholder={t('customizeAndFinishPage.detPhPlace')}
                                    />
                                    <button type="button" onClick={handleRandomMap} className="absolute right-3 top-1/2 -translate-y-1/2 text-magic-blue hover:text-white transition-colors" title="Random Location">
                                        <i className="fa-solid fa-dice text-xl"></i>
                                    </button>
                                </div>
                                {errors.place && <p className="text-red-400 text-sm mt-2 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.place.message}</p>}

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {FANTASY_LOCATIONS.slice(0, 3).map(loc => (
                                        <button key={loc} type="button" onClick={() => handlePresetMap(loc)} className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/5 transition-colors">
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10">
                                <label className="text-white font-bold text-lg mb-4 block"><i className="fa-solid fa-user-group text-magic-pink mr-2"></i> {t('customizeAndFinishPage.detBuddiesLabel')}</label>
                                <div className="relative">
                                    <input
                                        {...register('companions')}
                                        className={`w-full p-4 bg-black/40 rounded-xl border ${errors.companions ? 'border-red-500' : 'border-white/10'} focus:border-magic-pink outline-none text-white placeholder-gray-600 pl-12`}
                                        placeholder={t('customizeAndFinishPage.detPhBuddies')}
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-x-0 -translate-y-1/2 text-gray-500">
                                        <i className="fa-solid fa-paw"></i>
                                    </div>
                                </div>
                                {errors.companions && <p className="text-red-400 text-sm mt-2 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.companions.message}</p>}

                                <div className="grid grid-cols-4 gap-2 mt-4">
                                    {COMPANION_PRESETS.map((comp) => (
                                        <CompanionButton key={comp.label} companion={comp} onAdd={handleCompanionAdd} />
                                    ))}
                                    <button type="button" onClick={handleFriendAdd} className="flex flex-col items-center gap-1 p-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all group">
                                        <i className="fa-solid fa-plus text-lg text-white group-hover:text-magic-green"></i>
                                        <span className="text-[10px] text-gray-400 font-bold">{t('customizeAndFinishPage.detAdd')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10">
                                <label className="text-white font-bold text-lg mb-4 block"><i className="fa-solid fa-palette text-magic-purple mr-2"></i> {t('customizeAndFinishPage.detMagicLabel')}</label>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {COLORS.map((c) => (
                                        <ColorOption key={c.name} color={c} watchedColor={watchedColor} playMagicSound={playMagicSound} register={register} />
                                    ))}
                                </div>
                                {errors.color && <p className="text-red-400 text-sm mt-3 font-bold text-center"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.color.message}</p>}
                            </div>

                            <div className="bg-magic-card p-6 rounded-3xl shadow-xl border border-white/10">
                                <label className="text-white font-bold text-lg mb-4 block">
                                    <i className="fa-solid fa-wand-sparkles text-yellow-400 mr-2"></i>
                                    {t('customizeAndFinishPage.detWishLabel')}
                                </label>
                                <textarea
                                    {...register('secretWish')}
                                    className="w-full p-4 bg-black/40 rounded-xl border border-white/10 focus:border-yellow-400 outline-none text-white placeholder-gray-600 resize-none h-32"
                                    placeholder={t('customizeAndFinishPage.detPhWishes')}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 flex gap-4">
                        <Button variant="ghost" onClick={() => router.back()} className="text-gray-400 hover:text-white px-8">
                            {t('det_back')}
                        </Button>
                        <Button type="submit" fullWidth size="lg" className="text-xl shadow-xl shadow-purple-500/20 bg-gradient-to-r from-magic-purple to-magic-pink hover:to-pink-500 border-none animate-pulse-slow">
                            {t('det_create')} <i className="fa-solid fa-wand-magic-sparkles ml-2 text-yellow-300"></i>
                        </Button>
                    </div>
                </div>

                {/* Right Column: Live Preview (Sticky) (3/12) */}
                <div className="lg:col-span-3 order-1 lg:order-2 lg:sticky lg:top-8 animate-fade-in">
                    <LivePreview
                        coverImageSrc={coverImageSrc}
                        borderClass={borderClass}
                        theme={config.theme}
                        heroName={config.heroName}
                        watchedColor={watchedColor}
                        watchedWish={watchedWish as string}
                    />
                </div>

            </form>
        </div>
    );
};

