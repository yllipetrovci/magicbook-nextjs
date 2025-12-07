
'use client'
import { useRouter } from 'next/navigation';
import { Testimonials, FloatingSparkles, Button } from '@/app/components';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PricingSection } from './components/PricingSection';

export default function Page() {
  const router = useRouter();
  const { t } = useLanguage();

  const startFlow = () => router.push('/steps/whos-creating-it');

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden animate-fade-in text-white relative">

      <FloatingSparkles />

      {/* 1. HERO SECTION */}
      <div className="w-full pt-12 pb-24 px-4 text-center relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-magic-purple/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl font-serif">
            {t('landing_hero_headline')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md">
            {t('landing_hero_sub')}
          </p>

          {/* MAGIC CTA AREA */}
          <div className="flex flex-col items-center mb-16 relative z-50">
            <div className="relative group cursor-pointer" onClick={startFlow}>
              {/* Animated Glow Behind Button */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-magic-purple to-pink-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-slow"></div>
              <div className="absolute -inset-4 bg-magic-purple/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Floating Sparkles around CTA */}
              <div className="absolute -top-8 -left-4 text-yellow-300 text-3xl animate-bounce-slow"><i className="fa-solid fa-star"></i></div>
              <div className="absolute -bottom-6 -right-8 text-magic-blue text-2xl animate-wiggle"><i className="fa-solid fa-sparkles"></i></div>
              <div className="absolute top-1/2 -right-12 text-pink-400 text-sm animate-spin-slow"><i className="fa-solid fa-star"></i></div>
              <div className="absolute top-0 -right-2 text-white text-xs animate-ping"><i className="fa-solid fa-star"></i></div>

              <Button size="lg" className="relative text-xl md:text-2xl px-14 py-6 bg-gradient-to-r from-magic-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full shadow-[0_0_40px_rgba(139,92,246,0.5)] transform hover:scale-105 transition-all border-t border-white/20 font-display">
                {t('landing_cta_primary')} <i className="fa-solid fa-wand-magic-sparkles ml-3 text-yellow-300"></i>
              </Button>
            </div>

            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-sm text-yellow-400 font-bold tracking-wide animate-pulse">✨ Try the FIRST free page preview for free — no credit card needed</p>
            </div>
          </div>

          {/* VISUAL MOCKUP - FLOATING MAGIC CARDS */}
          <div className="relative max-w-5xl mx-auto mt-20 mb-32 h-[750px] flex items-center justify-center">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-magic-purple/20 to-transparent blur-[100px] rounded-full pointer-events-none"></div>

            {/* Card 3 (Right - The Companion) */}
            <div className="absolute top-10 right-4 md:right-10 w-56 md:w-72 h-72 md:h-96 bg-magic-card rounded-3xl border border-white/10 shadow-2xl transform rotate-12 opacity-90 scale-90 animate-float-delayed z-0 group hover:scale-95 transition-transform hover:z-30 hover:rotate-6 cursor-pointer">
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <img
                  src="https://image.pollinations.ai/prompt/cute%20magical%20blue%20dragon%20pet%20pixar%20style%20glowing%20eyes?width=400&height=600&nologo=true"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  alt="Companion"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="text-white font-bold text-sm">Magical Friends</div>
                </div>
              </div>
            </div>

            {/* Card 2 (Left - The World) */}
            <div className="absolute bottom-10 left-4 md:left-10 w-56 md:w-72 h-72 md:h-96 bg-magic-card rounded-3xl border border-white/10 shadow-2xl transform -rotate-12 opacity-90 scale-95 animate-float z-10 group hover:scale-100 transition-transform hover:z-30 hover:-rotate-6 cursor-pointer">
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <img
                  src="https://image.pollinations.ai/prompt/magical%20floating%20islands%20fantasy%20world%20clouds%20colorful%20pixar%20style?width=400&height=600&nologo=true"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  alt="World"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="text-white font-bold text-sm">Enchanted Worlds</div>
                </div>
              </div>
            </div>

            {/* Card 1 (Front - The Hero) - MADE BIGGER */}
            <div className="relative w-80 md:w-[450px] h-[500px] md:h-[680px] bg-gradient-to-br from-[#1a1c2e] to-[#0B0C15] rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.7)] border-4 border-white/10 transform hover:scale-105 transition-transform duration-500 z-20 group cursor-pointer" onClick={startFlow}>

              {/* Glowing Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-magic-orange via-magic-purple to-magic-blue opacity-50 blur-lg rounded-[2.5rem] group-hover:opacity-80 transition duration-500 animate-pulse-slow"></div>

              <div className="relative h-full w-full bg-magic-card rounded-[2.3rem] overflow-hidden flex flex-col">
                {/* Image taking up most of the card */}
                <div className="h-full w-full relative overflow-hidden">
                  <img
                    src="https://image.pollinations.ai/prompt/cute%20hero%20kid%20wizard%20casting%20spells%20pixar%20style%20glowing%20magic%20dynamic%20pose?width=800&height=1200&nologo=true"
                    alt="Hero"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                  {/* Hero Badge */}
                  <div className="absolute top-6 left-6 bg-magic-orange text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg border border-white/20 uppercase tracking-wider">
                    Your Child
                  </div>
                </div>

                {/* Text Content at Bottom */}
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
                      <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-white leading-none mb-1">The Hero</h3>
                      <p className="text-gray-300 text-sm font-bold tracking-wide">Starring in their own tale</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. AS SEEN IN SECTION - FULL STRIP (UPDATED BIGGER) */}
      <div className="w-full bg-white/5 border-y border-white/10 py-16 relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-magic-bg/90 backdrop-blur-md"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap mb-4 md:mb-0">As Seen In</p>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Simulated Logos with Typography - SCALED UP */}
            <div className="flex items-center gap-3 group cursor-default transform hover:scale-110 transition-transform">
              <i className="fa-brands fa-disney text-5xl"></i>
              <span className="font-display font-black text-4xl tracking-tight mt-1">Disney</span>
            </div>
            <div className="flex items-center gap-3 group cursor-default transform hover:scale-110 transition-transform">
              <i className="fa-solid fa-book-open text-4xl"></i>
              <span className="font-serif font-bold text-3xl italic">Scholastic</span>
            </div>
            <div className="flex items-center gap-2 group cursor-default transform hover:scale-110 transition-transform">
              <span className="font-sans font-black text-4xl tracking-tighter">PBS</span>
              <span className="font-sans font-light text-4xl">KIDS</span>
            </div>
            <div className="flex items-center gap-2 group cursor-default transform hover:scale-110 transition-transform">
              <i className="fa-brands fa-amazon text-5xl mt-2"></i>
              <span className="font-sans font-bold text-3xl">Amazon</span>
            </div>
            <div className="flex items-center gap-3 group cursor-default transform hover:scale-110 transition-transform">
              <i className="fa-solid fa-star text-3xl text-magic-yellow"></i>
              <span className="font-serif font-bold text-2xl uppercase tracking-widest">Parents</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FEATURE HIGHLIGHT STRIP */}
      <div className="w-full bg-magic-card/50 backdrop-blur-md py-16 border-b border-white/5 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: 'fa-user-pen', text: t('landing_feat_1'), color: 'text-magic-blue' },
              { icon: 'fa-camera', text: t('landing_feat_2'), color: 'text-magic-pink' },
              { icon: 'fa-palette', text: t('landing_feat_3'), color: 'text-magic-purple' },
              { icon: 'fa-bolt', text: t('landing_feat_4'), color: 'text-magic-yellow' }
            ].map((feat, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className={`text-4xl ${feat.color} bg-white/5 p-5 rounded-3xl group-hover:scale-110 transition-transform border border-white/5 shadow-xl`}>
                  <i className={`fa-solid ${feat.icon}`}></i>
                </div>
                <p className="font-bold text-gray-300 leading-tight text-lg">{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. HOW IT WORKS */}
      <div className="w-full py-24 bg-transparent relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 font-serif">How the Magic Happens ✨</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

            {[
              { title: t('landing_how_1_title'), desc: t('landing_how_1_desc'), icon: 'fa-id-card', color: 'bg-magic-blue', shadow: 'shadow-blue-500/20' },
              { title: t('landing_how_2_title'), desc: t('landing_how_2_desc'), icon: 'fa-wand-sparkles', color: 'bg-magic-purple', shadow: 'shadow-purple-500/20' },
              { title: t('landing_how_3_title'), desc: t('landing_how_3_desc'), icon: 'fa-book-open', color: 'bg-magic-green', shadow: 'shadow-green-500/20' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group">
                <div className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center text-white text-4xl shadow-xl ${step.shadow} rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 mb-6 border border-white/10`}>
                  <i className={`fa-solid ${step.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* VIDEO EXPLAINER (Inserted below steps) */}
          <div className="mt-20 max-w-4xl mx-auto relative z-10 animate-fade-in">
            <div className="relative w-full aspect-video bg-black/50 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center bg-[url('https://picsum.photos/seed/magicvideo/1200/675')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 hover:scale-110 transition-transform shadow-xl group-hover:bg-white/30">
                  <i className="fa-solid fa-play text-4xl text-white pl-2"></i>
                </button>
              </div>
              <div className="absolute bottom-6 left-6 text-left">
                <p className="text-white font-bold text-lg drop-shadow-md">See how a story is born</p>
                <p className="text-white/70 text-sm">1 min explainer</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. CHILD TRANSFORMATION & STYLE */}
      <div className="w-full py-24 bg-magic-surface/20 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 font-serif">
            What Your Child’s Photo Looks Like
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Upload a photo of your child, and our AI transforms them into a magical
            illustrated character—perfectly fitting the story style you choose.
          </p>

          {/* Example Row - Side by Side on Desktop */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-24 max-w-6xl mx-auto relative">

            {/* Before - child's real photo */}
            <div className="flex flex-col items-center group relative z-10">
              <div className="text-sm text-gray-400 mb-3 font-bold uppercase tracking-widest group-hover:text-white transition-colors">Original Photo</div>
              <div className="relative">
                <img
                  src="https://image.pollinations.ai/prompt/portrait%20photo%20of%20a%20cute%20happy%206%20year%20old%20boy%20smiling%20casual%20clothes%20high%20quality%20photography?width=400&height=400&nologo=true&seed=123"
                  alt="Child Original"
                  className="rounded-3xl shadow-2xl border-4 border-white/10 w-64 h-64 md:w-80 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md font-bold">Real</div>
              </div>
            </div>

            {/* Magic Wand Separator */}
            <div className="flex flex-col items-center justify-center z-20">
              <div className="hidden md:flex text-magic-purple text-5xl animate-wiggle filter drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] transform rotate-12">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <div className="md:hidden text-magic-purple text-3xl animate-bounce mt-4 mb-4">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>

            {/* After - illustrated version */}
            <div className="flex flex-col items-center group relative z-10">
              <div className="text-sm text-magic-purple mb-3 font-bold uppercase tracking-widest group-hover:text-purple-300 transition-colors">AI Storybook Magic</div>
              <div className="relative">
                <div className="absolute inset-0 bg-magic-purple/30 blur-3xl rounded-full group-hover:bg-magic-purple/60 transition-colors opacity-60"></div>
                <img
                  src="https://image.pollinations.ai/prompt/cute%203d%20pixar%20style%20cartoon%20character%20of%20a%206%20year%20old%20boy%20smiling%20magical%20background%20soft%20lighting?width=400&height=400&nologo=true&seed=123"
                  alt="Child Illustration"
                  className="rounded-3xl shadow-2xl border-4 border-magic-purple/50 w-64 h-64 md:w-80 md:h-80 object-cover relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-magic-purple to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl border-4 border-magic-card shadow-xl z-20 animate-bounce-slow">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
              </div>
            </div>

          </div>

          {/* Style Options */}
          <h3 className="text-3xl font-black text-white mb-6 font-serif">Choose Your Style</h3>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Whether you prefer a classic watercolor look or a modern 3D adventure, we have a style for every dream.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

            {/* Storybook */}
            <div className="p-4 bg-magic-card rounded-3xl border border-white/10 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer" onClick={startFlow}>
              <div className="overflow-hidden rounded-2xl mb-4 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src="https://image.pollinations.ai/prompt/whimsical%20watercolor%20children%20book%20illustration%20of%20a%20cute%20boy%20in%20a%20fairy%20tale%20forest%20soft%20pastel%20colors?width=400&height=300&nologo=true&seed=124"
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  alt="Storybook Style"
                />
                <div className="absolute bottom-2 left-2 z-20 bg-black/60 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm">Watercolor</div>
              </div>
              <div className="text-lg font-bold text-white mb-1 group-hover:text-magic-orange transition-colors">Classic Storybook</div>
              <div className="text-sm text-gray-400">Timeless watercolor magic.</div>
            </div>

            {/* Cute Animal */}
            <div className="p-4 bg-magic-card rounded-3xl border border-white/10 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer" onClick={startFlow}>
              <div className="overflow-hidden rounded-2xl mb-4 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src="https://image.pollinations.ai/prompt/cute%20anthropomorphic%20little%20lion%20cub%20wearing%20clothes%20reading%20a%20book%20pixar%20style?width=400&height=300&nologo=true&seed=125"
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  alt="Animal Style"
                />
                <div className="absolute bottom-2 left-2 z-20 bg-black/60 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm">Pixar Style</div>
              </div>
              <div className="text-lg font-bold text-white mb-1 group-hover:text-magic-blue transition-colors">Cute Animal</div>
              <div className="text-sm text-gray-400">Transform into a friendly critter.</div>
            </div>

            {/* Fantasy */}
            <div className="p-4 bg-magic-card rounded-3xl border border-white/10 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group cursor-pointer" onClick={startFlow}>
              <div className="overflow-hidden rounded-2xl mb-4 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src="https://image.pollinations.ai/prompt/epic%20fantasy%20illustration%20young%20hero%20boy%20with%20glowing%20sword%20on%20a%20mountain%20peak%20digital%20art?width=400&height=300&nologo=true&seed=126"
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  alt="Fantasy Style"
                />
                <div className="absolute bottom-2 left-2 z-20 bg-black/60 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm">Epic 3D</div>
              </div>
              <div className="text-lg font-bold text-white mb-1 group-hover:text-magic-pink transition-colors">Fantasy Hero</div>
              <div className="text-sm text-gray-400">Epic adventures await.</div>
            </div>

          </div>

        </div>
      </div>

      {/* 6. PRICING */}
      <div className="w-full py-24 bg-magic-surface/30 border-y border-white/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

        <PricingSection onPlanSelected={startFlow} title={t('landing_pricing_title')} />
      </div>

      {/* 7. TESTIMONIALS - AUTO SCROLL */}
      <div className="w-full py-16 bg-magic-bg border-t border-white/5">
        <Testimonials variant="full" />
      </div>

    </div>
  );
};
