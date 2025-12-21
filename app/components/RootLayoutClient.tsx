"use client";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProgressBar } from './ProgressBar';
// import { useStory } from '../contexts/StoryContext';
import { languages } from '../utils/translations';
import { Button } from './Button';
// import { Footer } from './Footer';
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useStory } from "../contexts/StoryContext";
import { User } from "../types";
import { DASHBOARD_PATHS, PATHS, STEPS_PATHS } from "../constants/relativeRoutePaths";

const HeroBackground: React.FC = () => {
    const defaultIcons = [
        { icon: 'fa-dragon', color: 'text-magic-purple', top: '10%', left: '5%', anim: 'animate-float' },
        { icon: 'fa-hat-wizard', color: 'text-magic-blue', top: '20%', right: '10%', anim: 'animate-bounce-slow' },
        { icon: 'fa-user-astronaut', color: 'text-magic-orange', bottom: '15%', left: '15%', anim: 'animate-float-delayed' },
        { icon: 'fa-robot', color: 'text-gray-600', top: '40%', left: '50%', anim: 'animate-pulse-slow' },
        { icon: 'fa-cat', color: 'text-magic-pink', bottom: '30%', right: '20%', anim: 'animate-wiggle' },
        { icon: 'fa-cloud', color: 'text-white', top: '15%', left: '80%', anim: 'animate-float', size: 'text-8xl', opacity: 'opacity-10' },
        { icon: 'fa-star', color: 'text-magic-yellow', top: '70%', left: '8%', anim: 'animate-spin-slow' },
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {defaultIcons.map((item, idx) => (
                <div
                    key={idx}
                    className={`absolute ${item.color} ${item.anim} ${item.size || 'text-6xl'} ${item.opacity || 'opacity-20'} transform hover:opacity-60 transition-opacity duration-500`}
                    style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                >
                    <i className={`fa-solid ${item.icon}`}></i>
                </div>
            ))}
        </div>
    );
};

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { t, language, setLanguage } = useLanguage();
    const { user, setUser }: any = useAuth();
    console.log("user in RootLayoutClient:", user);
    const { resetAll } = useStory();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const currentLang = languages.find(l => l.code === language) || languages[0];

    // Routes that should NOT have the navbar and main wrapper
    const isDashboardRoute = pathname?.startsWith('/dashboard');
    const isUpsellRoute = pathname?.startsWith('/upsell');
    const isShowCuponRoute = pathname?.startsWith('/steps/show-cupon');
    const isReadStoryRoute = pathname?.startsWith('/read-story');
    const isActive = (route: string) => pathname === route;


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setShowLangMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getInitials = (u: User) => {
        if (u.name && u.name.trim()) {
            const parts = u.name.trim().split(' ');
            if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return (u.email || 'User').substring(0, 2).toUpperCase();
    };


    if (isUpsellRoute || isShowCuponRoute) {
        // Dashboard routes get their own layout, so just return children
        return <>{children}</>;
    }

    // Non-dashboard routes get the navbar and main wrapper
    return (
        <div className="min-h-screen flex flex-col relative">

            {!isReadStoryRoute && <HeroBackground />}
            {!isReadStoryRoute && <ProgressBar />}

            <nav className="w-full p-4 md:p-6 flex justify-between items-center relative z-20">

                {/* Left Side: App Name & Main Nav */}
                <div className="flex items-center gap-8">
                    <div onClick={() => router.push('/')} className="cursor-pointer flex items-center gap-2 group">
                        <div className="bg-white/10 p-3 rounded-2xl shadow-md border border-white/10 group-hover:border-magic-purple transition-all transform group-hover:-rotate-3 relative overflow-hidden backdrop-blur-md">
                            <i className="fa-solid fa-book-open text-magic-purple text-2xl relative z-10"></i>
                        </div>
                        <span className="hidden md:block text-2xl font-black text-white tracking-tight group-hover:text-magic-purple transition-colors">
                            {t('app_name')}
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    {/* <p>{JSON.stringify(user)}</p> */}
                </div>

                {/* Right Side: Language & Auth */}
                <div className="flex items-center gap-4 relative">
                    

                    {/* Language Selector */}
                    <div className="relative" ref={langMenuRef}>
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="bg-white/10 px-3 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-bold text-gray-200 hover:border-magic-purple hover:text-white transition-all shadow-sm backdrop-blur-md"
                        >
                            <span className="text-lg">{currentLang.flag}</span>
                            <span className="hidden lg:inline">{currentLang.name}</span>
                            <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`}></i>
                        </button>

                        {showLangMenu && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-magic-card rounded-2xl shadow-xl border border-white/10 overflow-hidden py-2 z-50 animate-fade-in">
                                {languages.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${language === lang.code ? 'text-magic-purple font-bold' : 'text-gray-300'}`}
                                    >
                                        <span className="text-lg">{lang.flag}</span>
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-8 w-px bg-white/10 mx-1"></div>

                    {/* Auth Navigation */}
                    {user ? (
                        <div className="relative" ref={userMenuRef}>
                            {/* User Menu Trigger: Initials */}
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="w-10 h-10 rounded-full cursor-pointer bg-gradient-to-br from-magic-purple to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg border-2 border-white/20 hover:border-white/50 transition-all hover:scale-105 active:scale-95"
                                title="User Menu"
                            >
                                {getInitials(user)}
                            </button>

                            {/* User Dropdown */}
                            {showUserMenu && (
                                <div className="absolute top-full right-0 mt-3 w-64 bg-magic-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-fade-in backdrop-blur-xl">
                                    {/* Header */}
                                    <div className="px-5 py-4 border-b border-white/5 bg-white/5">
                                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        {/* <button onClick={() => { router.push(DASHBOARD_PATHS.LIBRARY); setShowUserMenu(false); }} className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                            <i className="fa-solid fa-grid-2 text-magic-blue w-5 text-center"></i> {t('nav_dashboard')}
                                        </button> */}
                                        <button onClick={() => { router.push(DASHBOARD_PATHS.LIBRARY); setShowUserMenu(false); }} className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                            <i className="fa-solid fa-book-open text-magic-purple w-5 text-center"></i> {t('dash_tab_library')}
                                        </button>
                                        <button onClick={() => { router.push(DASHBOARD_PATHS.READING_STYLE); setShowUserMenu(false); }} className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                            <i className="fa-solid fa-sliders text-magic-orange w-5 text-center"></i> Reader Style
                                        </button>
                                        <button onClick={() => { router.push('/hero'); setShowUserMenu(false); }} className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                            <i className="fa-solid fa-wand-magic-sparkles text-magic-purple w-5 text-center"></i> Create New
                                        </button>
                                        <button onClick={() => {
                                            router.push('/dashboard/credits');
                                            setShowUserMenu(false);
                                        }} className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                            <i className="fa-solid fa-coins text-yellow-400 w-5 text-center"></i>
                                            <span>Credits: <span className="font-bold text-white">{user?.credits}</span></span>
                                        </button>
                                    </div>

                                    <div className="border-t border-white/5 py-2">
                                        <button onClick={async () => {
                                            // Clear all user and story data
                                            setUser(null);
                                            resetAll();
                                            await fetch("/api/firebase/logout", { method: "POST" });
                                            router.push(PATHS.LOGIN);
                                        }} className="w-full text-left px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-3 transition-colors">
                                            <i className="fa-solid fa-right-from-bracket w-5 text-center"></i> {t('nav_logout')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            onClick={() => router.push(PATHS.LOGIN)}
                            size="sm"
                            className="shadow-lg hover:shadow-purple-500/20 bg-magic-orange hover:bg-orange-600 text-white border-0"
                        >
                            {t('nav_login')} <i className="fa-solid fa-right-to-bracket ml-2"></i>
                        </Button>
                    )}

                </div>
            </nav>

            {/* MOBILE BOTTOM NAVIGATION BAR */}
            {user && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-magic-bg/80 backdrop-blur-xl border-t border-white/10 z-[100] flex items-center justify-around px-4">
                    <Link href="/dashboard" className={`flex flex-col items-center gap-1 transition-all ${isActive('/dashboard') ? 'text-magic-purple scale-110' : 'text-gray-500'}`}>
                        <i className={`fa-solid fa-book-bookmark text-xl`}></i>
                        <span className="text-[10px] font-black uppercase tracking-widest">Library</span>
                    </Link>

                    <Link href="/dashboard/videos" className={`flex flex-col items-center gap-1 transition-all ${isActive('/dashboard/videos') ? 'text-magic-green scale-110' : 'text-gray-500'}`}>
                        <i className={`fa-solid fa-film text-xl`}></i>
                        <span className="text-[10px] font-black uppercase tracking-widest">Videos</span>
                    </Link>

                    {/* CENTRAL ACTION BUTTON */}
                    <div className="relative -top-6">
                        <button
                            onClick={() => router.push(STEPS_PATHS?.STEP_1 || '/steps/name')}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-magic-purple to-indigo-600 border-4 border-magic-bg flex items-center justify-center text-white text-2xl shadow-[0_10px_20px_rgba(139,92,246,0.5)] transform active:scale-90 transition-transform"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>

                    <Link href="/quest" className={`flex flex-col items-center gap-1 transition-all ${isActive('/quest') ? 'text-magic-orange scale-110' : 'text-gray-500'}`}>
                        <i className={`fa-solid fa-map-location-dot text-xl`}></i>
                        <span className="text-[10px] font-black uppercase tracking-widest">Quest</span>
                    </Link>

                    <Link href="/dashboard/credits" className={`flex flex-col items-center gap-1 transition-all ${isActive('/dashboard/credits') ? 'text-magic-blue scale-110' : 'text-gray-500'}`}>
                        <i className={`fa-solid fa-gauge-high text-xl`}></i>
                        <span className="text-[10px] font-black uppercase tracking-widest">Dash</span>
                    </Link>
                </div>
            )}

            <main className="flex-grow relative z-10">
                {children}
            </main>

            {!isReadStoryRoute && <footer className="bg-magic-bg/80 backdrop-blur-lg py-12 border-t border-white/5 mt-20 relative z-10">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-8">
                    <div className="flex flex-col gap-4 max-w-xs">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-book-open text-magic-purple text-2xl"></i>
                            <span className="text-xl font-black text-white">AI Magic Book</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Creating magical moments between parents and children through the power of storytelling.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-magic-purple hover:text-white transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-magic-pink hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-magic-blue hover:text-white transition-colors"><i className="fa-brands fa-twitter"></i></a>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-8 md:gap-16">
                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/hero" className="hover:text-magic-purple transition-colors">Create Story</Link></li>
                                <li><Link href="/create-video" className="hover:text-magic-purple transition-colors">Magic Video</Link></li>
                                <li><Link href="/create-drawing" className="hover:text-magic-purple transition-colors">Coloring Corner</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/contact" className="hover:text-magic-purple transition-colors">{t('footer_contact')}</Link></li>
                                <li><Link href="/about" className="hover:text-magic-purple transition-colors">About Us</Link></li>
                                <li><Link href="/faq" className="hover:text-magic-purple transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/terms" className="hover:text-magic-purple transition-colors">{t('footer_terms')}</Link></li>
                                <li><Link href="/privacy" className="hover:text-magic-purple transition-colors">{t('footer_privacy')}</Link></li>
                                <li><Link href="/refund" className="hover:text-magic-purple transition-colors">{t('footer_refund')}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
                    © 2025 AI Magic Book. All rights reserved.
                </div>
            </footer>}
        </div>
    );
}
