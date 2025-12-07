'use client'

import React from "react";

interface StoryToneOptionProps {
    tone: {
        id: string;
        label: string;
        bg: string;
        color: string;
        icon: string;
        desc: string;
    };
    watchedTone: string;
    onClick: () => void;
    register: any; // Use appropriate type from react-hook-form if available
}

const StoryToneOption: React.FC<StoryToneOptionProps> = ({ tone, watchedTone, onClick, register }) => {
    const [hydrated, setHydrated] = React.useState(false);

    React.useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;

    return (
        <label
            key={tone.id}
            className={`cursor-pointer p-3 rounded-xl border-2 transition-all flex items-start gap-3 ${watchedTone === tone.label ? tone.bg + ' shadow-lg scale-105' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
            onClick={onClick}
        >
            <input type="radio" value={tone.label} {...register('tone')} className="hidden" />
            <div className={`mt-1 ${tone.color} text-xl`}><i className={`fa-solid ${tone.icon}`}></i></div>
            <div>
                <div className="font-bold text-white text-sm">{tone.label}</div>
                <div className="text-[10px] text-gray-400 leading-tight">{tone.desc}</div>
            </div>
        </label>
    );
};

export default StoryToneOption;