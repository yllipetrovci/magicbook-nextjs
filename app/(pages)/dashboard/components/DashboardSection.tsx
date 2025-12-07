
import React from 'react';
import { Button } from '@/app/components';
import { CreateCard } from './CreateCard';

interface EmptyStateConfig {
    icon: string;
    message: string;
    buttonLabel: string;
    buttonIcon?: string;
}

interface CreateCardConfig {
    title: string;
    subtext: string;
    icon?: string;
    theme: 'purple' | 'green' | 'blue' | 'orange';
}

interface DashboardSectionProps<T> {
    title: string;
    icon: string;
    iconColor: string; // Tailwind class e.g., 'text-magic-purple'
    count: number;
    countLabel: string;
    badgeColor: string; // Tailwind class e.g., 'text-green-400'
    dotColor: string;   // Tailwind class e.g., 'bg-green-500'
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    emptyState: EmptyStateConfig;
    createCard?: CreateCardConfig;
    onCreate: () => void;
    gridCols?: string; // Default: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    className?: string;
}

export const DashboardSection = <T,>({
    title,
    icon,
    iconColor,
    count,
    countLabel,
    badgeColor,
    dotColor,
    items,
    renderItem,
    emptyState,
    createCard,
    onCreate,
    gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    className = ''
}: DashboardSectionProps<T>) => {
    return (
        <div className={`bg-magic-card/30 rounded-3xl p-4 md:p-6 border border-white/5 relative overflow-hidden transition-all hover:bg-magic-card/40 flex flex-col ${className}`}>

            {/* Live Counter Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 shadow-lg z-10">
                <div className={`w-2 h-2 rounded-full animate-pulse ${dotColor}`}></div>
                <span className={`text-[10px] md:text-xs font-bold ${badgeColor}`}>{count.toLocaleString()} {countLabel}</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <i className={`fa-solid ${icon} text-xl ${iconColor}`}></i>
                <h2 className="text-xl font-black text-white">{title}</h2>
            </div>

            {/* Content */}
            {items.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-10 text-center opacity-70 px-4 flex-grow min-h-[200px]">
                    <i className={`fa-solid ${emptyState.icon} text-4xl text-gray-600 mb-2`}></i>
                    <p className="text-lg text-gray-400 font-bold mb-4">{emptyState.message}</p>
                    <Button onClick={onCreate} size="md" className={`w-full md:w-auto shadow-xl ${iconColor.replace('text-', 'shadow-').replace('magic-', '')}-500/20`}>
                        {emptyState.buttonLabel} <i className={`fa-solid ${emptyState.buttonIcon || 'fa-plus'} ml-2`}></i>
                    </Button>
                </div>
            ) : (
                // Grid Layout
                <div className={`grid ${gridCols} gap-4`}>

                    {/* Create Card (First Item) */}
                    {createCard && (
                        <CreateCard
                            title={createCard.title}
                            subtext={createCard.subtext}
                            icon={createCard.icon || 'fa-plus'}
                            onClick={onCreate}
                            theme={createCard.theme}
                        />
                    )}

                    {/* Render Items */}
                    {items.map((item, index) => renderItem(item, index))}
                </div>
            )}
        </div>
    );
};
