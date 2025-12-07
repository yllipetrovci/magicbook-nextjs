
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { TrustSection } from '@/app/components/TrustSection';
import { useLanguage } from '@/app/contexts/LanguageContext';

export const Checkout: React.FC = () => {
   const router = useRouter();
   const { addCredits } = useStory();
   const { t } = useLanguage();

   const handlePayment = () => {
      // Simulate payment processing
      const btn = document.activeElement as HTMLButtonElement;
      if (btn) {
         btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
         btn.disabled = true;
      }
      setTimeout(() => {
         // Add 10 credits as a simulation of purchasing the pack
         addCredits(10);
         // Redirect to Upsell Sequence
         router.push('/upsell-book');
      }, 2000);
   };

   return (
      <div className="flex flex-col items-center min-h-[80vh] px-4 py-12">
         <Button variant="ghost" onClick={() => router.back()} className="self-start mb-8 ml-4 md:ml-20 text-gray-400 hover:text-white"><i className="fa-solid fa-arrow-left"></i> {t('check_back')}</Button>

         <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
            {/* Order Summary */}
            <div className="flex-1 bg-magic-card p-8 rounded-3xl shadow-xl border border-white/5 h-fit">
               <h3 className="text-2xl font-bold text-white mb-6">{t('check_summary')}</h3>
               <div className="flex items-start gap</div>-4 mb-6">
                  <div className="w-24 h-32 bg-magic-bg rounded-lg flex items-center justify-center text-gray-600 border border-white/10">
                     <i className="fa-regular fa-image text-2xl"></i>
                  </div>
                  <div>
                     <p className="font-bold text-gray-200">Credit Pack / Subscription</p>
                     <p className="text-sm text-gray-400 mb-2">One-time or Monthly</p>
                     <div className="flex items-center gap-2">
                        <span className="text-gray-500 line-through text-sm">$29.99</span>
                        <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded">50% OFF</span>
                     </div>
                  </div>
               </div>
               <div className="border-t border-white/10 py-4 space-y-2">
                  <div className="flex justify-between text-gray-400"><span>{t('check_subtotal')}</span><span>$29.99</span></div>
                  <div className="flex justify-between text-green-400 font-bold"><span>Coupon (MAGICFUN)</span><span>-$15.00</span></div>
               </div>
               <div className="border-t border-white/10 py-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-white">{t('check_total')}</span>
                  <span className="text-2xl font-bold text-magic-orange">$14.99</span>
               </div>

               {/* Trustpilot Badge (Reusable) */}
               <TrustSection variant="minimal" className="mt-6" />

               <div className="bg-red-500/10 p-4 rounded-xl mt-4 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                     <i className="fa-solid fa-lock"></i> {t('check_secure')}
                  </div>
                  <p className="text-xs text-red-300/70">{t('check_secure_text')}</p>
               </div>
            </div>

            {/* Payment Details */}
            <div className="flex-[1.5] bg-magic-card p-8 rounded-3xl shadow-xl border border-white/5">
               <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <i className="fa-regular fa-credit-card text-magic-orange"></i> {t('check_details')}
               </h3>

               {/* Payment Icons */}
               <div className="flex gap-3 mb-6 opacity-70">
                  <i className="fa-brands fa-cc-visa text-3xl text-white"></i>
                  <i className="fa-brands fa-cc-mastercard text-3xl text-white"></i>
                  <i className="fa-brands fa-cc-amex text-3xl text-white"></i>
                  <i className="fa-brands fa-cc-paypal text-3xl text-white"></i>
                  <i className="fa-brands fa-cc-apple-pay text-3xl text-white"></i>
               </div>

               <div className="space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Card Number</label>
                     <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-300 mb-2">Cardholder Name</label>
                     <input type="text" placeholder="John Doe" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600" />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600" />
                     </div>
                  </div>
                  <Button fullWidth onClick={handlePayment} size="lg" className="shadow-lg shadow-orange-500/20 text-xl">{t('check_pay')} $14.99 <i className="fa-solid fa-lock ml-2"></i></Button>
                  <p className="text-center text-xs text-gray-500 mt-4">{t('check_terms')}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Checkout;