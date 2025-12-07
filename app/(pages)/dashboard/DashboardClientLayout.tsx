'use client';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from '@/app/contexts/LanguageContext';



export const DashboardClientLayout = ({ children }: { children: ReactNode }) => {
    const { user } = useStory();
    const router = useRouter();
    const { t } = useLanguage();
    const pathname = usePathname();

    // Sidebar Menu Items
    const MENU_ITEMS = [
        { id: 'library', path: '/dashboard', label: t('dash_tab_library'), icon: 'fa-book-open', color: 'text-magic-purple' },
        { id: 'videos', path: '/dashboard/videos', label: t('dash_tab_videos'), icon: 'fa-film', color: 'text-magic-green' },
        { id: 'drawing', path: '/dashboard/coloring', label: t('dash_tab_drawings'), icon: 'fa-palette', color: 'text-magic-blue' },
        { id: 'invite', path: '/dashboard/invite', label: t('dash_tab_invite'), icon: 'fa-gift', color: 'text-yellow-400' },
    ];


    return (
        <div className="flex flex-col min-h-[90vh] max-w-[1400px] mx-auto w-full animate-fade-in relative px-4 md:px-8 py-6">

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 min-h-[600px]">

                {/* SIDEBAR (Desktop) / TOP TABS (Mobile) */}
                <div className="md:sticky md:top-24 h-fit z-30">
                    <div className="bg-magic-card/50 backdrop-blur-md rounded-3xl border border-white/10 p-4 shadow-xl flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-4 no-scrollbar">
                        {MENU_ITEMS.map((item) => {
                            const isInvite = item.id === 'invite';
                            const isActive = pathname === item.path;
                            // Hide Invite tab on Desktop main menu since we have the sidebar widget
                            const desktopHiddenClass = isInvite ? 'md:hidden' : '';

                            return (
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    className={`
        flex items-center gap-4 px-4 py-3 rounded-2xl transition-all whitespace-nowrap md:whitespace-normal group
        ${desktopHiddenClass}
        ${isActive
                                            ? "bg-white/10 border border-white/10 shadow-lg"
                                            : "hover:bg-white/5 border border-transparent"}
        ${isInvite && !isActive
                                            ? "bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                                            : ""}
      `}
                                >
                                    {/* Icon Wrapper */}
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg 
          ${isActive
                                                ? `bg-magic-surface shadow-inner ${item.color}`
                                                : isInvite
                                                    ? "bg-yellow-500/20 text-yellow-400 shadow-inner"
                                                    : "bg-white/5 text-gray-500"
                                            }
        `}
                                    >
                                        <i className={`fa-solid ${item.icon}`}></i>
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`font-bold 
          ${isActive
                                                ? "text-white"
                                                : isInvite
                                                    ? "text-yellow-100"
                                                    : "text-gray-400 group-hover:text-gray-200"
                                            }
        `}
                                    >
                                        {item.label}
                                    </span>

                                    {/* Active Indicator Line (Desktop only) */}
                                    {isActive && (
                                        <div className="ml-auto hidden md:block w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>
                                    )}

                                    {/* Invite Sparkle (Mobile & Desktop) */}
                                    {isInvite && !isActive && (
                                        <i className="fa-solid fa-sparkles text-yellow-400 text-xs animate-pulse ml-auto"></i>
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Credit Balance Widget (Sidebar Bottom) */}
                    <div className="mt-6 bg-gradient-to-br from-magic-card to-gray-900 rounded-3xl p-6 border border-white/10 shadow-lg text-center hidden md:block">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Balance</p>
                        <div className="text-4xl font-black text-white mb-1">{user?.credits}</div>
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

                    {/* SEASONAL QUEST BANNER - Persistent across dashboard sub-routes */}
                    <div onClick={() => router.push('/quest')} className="relative w-full h-40 rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border-2 border-red-500/30 hover:border-red-500/60 transition-all">
                        <img src="https://image.pollinations.ai/prompt/christmas%20magic%20forest%20snowy%20road%20wide%20banner?width=1200&height=400&nologo=true" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80" alt="Xmas Quest" />
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-transparent to-transparent flex flex-col justify-center px-8 md:px-12">
                            <div className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-2 animate-pulse shadow-lg">Special Event</div>
                            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-1 group-hover:translate-x-2 transition-transform">The Lost Reindeer</h2>
                            <p className="text-gray-200 font-bold flex items-center gap-2">
                                <i className="fa-solid fa-map-location-dot"></i> Daily Chapter Quest
                            </p>
                        </div>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-play text-white text-2xl ml-1"></i>
                        </div>
                    </div>

                    {/* Sub-Route Content */}
                    {children}

                </div>
            </div>
        </div>
    );
};

export default DashboardClientLayout;
