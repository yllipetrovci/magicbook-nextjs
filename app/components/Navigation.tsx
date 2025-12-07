import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/app/components';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Language {
    code: string;
    name: string;
    flag: string;
}

interface User {
    avatar: string;
    // Add other user properties if needed
}

interface HeaderProps {
    user: User | null;
    logout: () => void;
    languages: Language[];
    currentLang: Language;
    setLanguage: (code: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, logout, languages, currentLang, setLanguage }) => {
    const router = useRouter();
    const { t } = useLanguage();

    const [showLangMenu, setShowLangMenu] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setShowLangMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [langMenuRef]);

    return (
        <nav className="w-full p-4 md:p-6 flex justify-between items-center relative z-20">
            {/* Left Side: App Name */}
            <div onClick={() => router.push('/')} className="cursor-pointer flex items-center gap-2 group">
                <div className="bg-white/10 p-3 rounded-2xl shadow-md border border-white/10 group-hover:border-magic-purple transition-all transform group-hover:-rotate-3 relative overflow-hidden backdrop-blur-md">
                    <i className="fa-solid fa-book-open text-magic-purple text-2xl relative z-10"></i>
                </div>
                {/* Hidden on mobile as requested */}
                <span className="hidden md:block text-2xl font-black text-white tracking-tight group-hover:text-magic-purple transition-colors">
                    {t('app_name')}
                </span>
            </div>

            {/* Right Side: Language & Auth */}
            <div className="flex items-center gap-2 md:gap-4 relative">
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
                                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${currentLang.code === lang.code ? 'text-magic-purple font-bold' : 'text-gray-300'}`}
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
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-gray-200 hover:text-magic-purple font-bold transition-colors">
                            <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-magic-purple shadow-sm" />
                            <span className="hidden md:inline">{t('nav_dashboard')}</span>
                        </button>
                        <div className="h-4 w-px bg-white/10"></div>
                        <button onClick={() => { logout(); router.push('/'); }} className="text-gray-400 hover:text-red-400 font-bold text-sm">
                            <i className="fa-solid fa-right-from-bracket md:hidden"></i>
                            <span className="hidden md:inline">{t('nav_logout')}</span>
                        </button>
                    </div>
                ) : (
                    <Button
                        onClick={() => router.push('/auth')}
                        size="sm"
                        className="shadow-lg hover:shadow-purple-500/20 bg-magic-orange hover:bg-orange-600 text-white border-0"
                    >
                        {t('nav_login')} <i className="fa-solid fa-right-to-bracket ml-2"></i>
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Header;