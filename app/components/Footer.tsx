import Link from 'next/link';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-magic-bg/80 backdrop-blur-lg py-12 border-t border-white/5 mt-20 relative z-0 ">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-8">
                <div className="flex flex-col gap-4 max-w-xs">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-book-open text-magic-purple text-2xl"></i>
                        <span className="text-xl font-black text-white">{t('footer.brandName')}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {t('footer.tagline')}
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-magic-purple hover:text-white transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-magic-pink hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-magic-blue hover:text-white transition-colors"><i className="fa-brands fa-twitter"></i></a>
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 md:gap-16">
                    <div>
                        <h4 className="font-bold text-white mb-4">{t('footer.sections.product')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/steps/whos-creating-it" className="hover:text-magic-purple transition-colors">{t('footer.links.createStory')}</Link></li>
                            <li><Link href="/create-video" className="hover:text-magic-purple transition-colors">{t('footer.links.magicVideo')}</Link></li>
                            <li><Link href="/create-drawing" className="hover:text-magic-purple transition-colors">{t('footer.links.coloringCorner')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">{t('footer.sections.support')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/contact" className="hover:text-magic-purple transition-colors">{t('footer.links.contact')}</Link></li>
                            <li><Link href="/about" className="hover:text-magic-purple transition-colors">{t('footer.links.aboutUs')}</Link></li>
                            <li><Link href="/faq" className="hover:text-magic-purple transition-colors">{t('footer.links.faq')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">{t('footer.sections.legal')}</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/terms" className="hover:text-magic-purple transition-colors">{t('footer.links.terms')}</Link></li>
                            <li><Link href="/privacy" className="hover:text-magic-purple transition-colors">{t('footer.links.privacy')}</Link></li>
                            <li><Link href="/refund" className="hover:text-magic-purple transition-colors">{t('footer.links.refund')}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
                {t('footer.copyright')}
            </div>
        </footer>
    );
}