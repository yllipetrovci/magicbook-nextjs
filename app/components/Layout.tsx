import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';
import { useStory } from '../context/StoryContext';
import { languages } from '../utils/translations';
import { Button } from './Button';

// Background Animation Component
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

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage, user, logout } = useStory();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <HeroBackground />
      <ProgressBar />
      
      <nav className="w-full p-4 md:p-6 flex justify-between items-center relative z-20">
        
        {/* Left Side: App Name */}
        <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-2 group">
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
            <div className="flex items-center gap-4">
               <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-200 hover:text-magic-purple font-bold transition-colors">
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-magic-purple shadow-sm" />
                  <span className="hidden md:inline">{t('nav_dashboard')}</span>
               </button>
               <div className="h-4 w-px bg-white/10"></div>
               <button onClick={() => { logout(); navigate('/'); }} className="text-gray-400 hover:text-red-400 font-bold text-sm">
                  <i className="fa-solid fa-right-from-bracket md:hidden"></i>
                  <span className="hidden md:inline">{t('nav_logout')}</span>
               </button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate('/auth')} 
              size="sm" 
              className="shadow-lg hover:shadow-purple-500/20 bg-magic-orange hover:bg-orange-600 text-white border-0"
            >
              {t('nav_login')} <i className="fa-solid fa-right-to-bracket ml-2"></i>
            </Button>
          )}

        </div>
      </nav>
      
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>

      <footer className="bg-magic-bg/80 backdrop-blur-lg py-12 border-t border-white/5 mt-20 relative z-10">
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
                        <li><Link to="/hero" className="hover:text-magic-purple transition-colors">Create Story</Link></li>
                        <li><Link to="/create-video" className="hover:text-magic-purple transition-colors">Magic Video</Link></li>
                        <li><Link to="/create-drawing" className="hover:text-magic-purple transition-colors">Coloring Corner</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/contact" className="hover:text-magic-purple transition-colors">{t('footer_contact')}</Link></li>
                        <li><Link to="/about" className="hover:text-magic-purple transition-colors">About Us</Link></li>
                        <li><Link to="/faq" className="hover:text-magic-purple transition-colors">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/terms" className="hover:text-magic-purple transition-colors">{t('footer_terms')}</Link></li>
                        <li><Link to="/privacy" className="hover:text-magic-purple transition-colors">{t('footer_privacy')}</Link></li>
                        <li><Link to="/refund" className="hover:text-magic-purple transition-colors">{t('footer_refund')}</Link></li>
                    </ul>
                </div>
            </div>
         </div>
         <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
            © 2024 AI Magic Book. All rights reserved.
         </div>
      </footer>
    </div>
  );
};