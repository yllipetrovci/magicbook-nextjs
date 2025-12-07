
import React from 'react';

interface CreateCardProps {
    title: string;
    subtext?: string;
    icon?: string;
    onClick: () => void;
    theme?: 'purple' | 'green' | 'blue' | 'orange';
}

export const CreateCard: React.FC<CreateCardProps> = ({
    title,
    subtext,
    icon = 'fa-plus',
    onClick,
    theme = 'purple'
}) => {

    const themeStyles = {
        purple: {
            border: 'hover:border-magic-purple',
            iconColor: 'text-gray-500 group-hover:text-magic-purple',
            textColor: 'group-hover:text-magic-purple',
            bgHover: 'hover:bg-magic-card/80'
        },
        green: {
            border: 'hover:border-magic-green',
            iconColor: 'text-gray-500 group-hover:text-magic-green',
            textColor: 'group-hover:text-magic-green',
            bgHover: 'hover:bg-magic-card/80'
        },
        blue: {
            border: 'hover:border-magic-blue',
            iconColor: 'text-gray-500 group-hover:text-magic-blue',
            textColor: 'group-hover:text-magic-blue',
            bgHover: 'hover:bg-magic-card/80'
        },
        orange: {
            border: 'hover:border-magic-orange',
            iconColor: 'text-gray-500 group-hover:text-magic-orange',
            textColor: 'group-hover:text-magic-orange',
            bgHover: 'hover:bg-magic-card/80'
        }
    };

    const currentTheme = themeStyles[theme];

    return (
        <div
            onClick={onClick}
            className={`
          bg-magic-card/50 rounded-2xl border-2 border-dashed border-white/10 
          transition-all cursor-pointer flex flex-col items-center justify-center 
          min-h-[200px] group relative overflow-hidden
          ${currentTheme.border} ${currentTheme.bgHover}
        `}
        >
            <div className={`w-16 h-16 bg-magic-surface rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner transition-transform group-hover:scale-110 ${currentTheme.iconColor}`}>
                <i className={`fa-solid ${icon}`}></i>
            </div>
            <h3 className={`text-lg font-bold text-white transition-colors ${currentTheme.textColor}`}>
                {title}
            </h3>
            {subtext && (
                <p className="text-xs text-gray-500 mt-1 font-medium bg-black/20 px-2 py-0.5 rounded-full">
                    {subtext}
                </p>
            )}

            {/* Hover Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
        </div>
    );
};
