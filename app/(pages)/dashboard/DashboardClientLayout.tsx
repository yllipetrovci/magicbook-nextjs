'use client';
import { useState } from 'react';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { usePathname } from "next/navigation";
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { SeasonalQuestBanner } from './components/SeasonalQuestBanner';
import { MenuLink } from './components/MenuLink';
import { DASHBOARD_PATHS } from '@/app/constants/relativeRoutePaths';



export const DashboardClientLayout = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();
    const pathname = usePathname();
    const [jobs, setJobs] = useState<any[]>([]);

    // Sidebar Menu Items
    const MENU_ITEMS = [
        { id: 'library', path: DASHBOARD_PATHS.LIBRARY, label: t('dash_tab_library'), icon: 'fa-book-open', color: 'text-magic-purple' },
        { id: 'videos', path: DASHBOARD_PATHS.VIDEOS, label: t('dash_tab_videos'), icon: 'fa-film', color: 'text-magic-green' },
        { id: 'drawing', path: DASHBOARD_PATHS.COLORING, label: t('dash_tab_drawings'), icon: 'fa-palette', color: 'text-magic-blue' },
        { id: 'invite', path: '/dashboard/invite', label: t('dash_tab_invite'), icon: 'fa-gift', color: 'text-yellow-400' },
    ];

    return (
        <div className="flex flex-col min-h-[90vh] max-w-[1400px] mx-auto w-full animate-fade-in relative px-4 md:px-8 py-6">

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 min-h-[600px]">

                {/* SIDEBAR (Desktop) / TOP TABS (Mobile) */}
                <div className="md:sticky md:top-24 h-fit z-30">
                    <div className="bg-magic-card/50 backdrop-blur-md rounded-3xl border border-white/10 p-4 shadow-xl flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-4 no-scrollbar">
                        {MENU_ITEMS.map((item) => (
                            <MenuLink
                                key={item.id}
                                item={item}
                                isActive={pathname === item.path}
                            />
                        ))}
                    </div>

                    {/* Credit Balance Widget (Sidebar Bottom) */}
                    <div className="mt-6 bg-gradient-to-br from-magic-card to-gray-900 rounded-3xl p-6 border border-white/10 shadow-lg text-center hidden md:block">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Balance</p>
                        <div className="text-4xl font-black text-white mb-1">{user?.credits ?? 0}</div>
                        <p className="text-sm text-yellow-400 font-bold mb-4"><i className="fa-solid fa-coins"></i> Magic Credits</p>
                        <Button size="sm" fullWidth onClick={() => router.push('/dashboard/credits')} className="bg-white/10 hover:bg-white/20 border-0">
                            Top Up
                        </Button>
                    </div>

                    {/* Free Credits Widget (Sidebar Bottom) */}
                    <div onClick={() => router.push('/dashboard/invite')} className="mt-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-6 border border-white/10 shadow-xl text-center hidden md:block cursor-pointer hover:border-yellow-400/50 hover:shadow-yellow-400/10 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                            <i className="fa-solid fa-gift text-2xl text-white"></i>
                        </div>

                        <h3 className="text-white font-black text-lg leading-tight mb-1">Free Credits</h3>
                        <p className="text-xs text-gray-400 font-bold mb-3">Invite friends to earn</p>

                        <button className="w-full py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-bold text-white group-hover:bg-white/20 transition-colors">
                            Invite Now <i className="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex flex-col gap-6">
                    <SeasonalQuestBanner
                        title="The Frost King’s Trial"
                        subtitle="Limited Winter Quest"
                        badgeText="Winter Event"
                        href="/quest/winter"
                    />

                    {/* Sub-Route Content */}
                    {children}

                </div>
            </div>
        </div>
    );
};

export default DashboardClientLayout;
