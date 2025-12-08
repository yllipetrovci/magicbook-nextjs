
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { OrderSummary } from './components/OrderSummary';
import { PaymentForm } from './components/PaymentForm';
import { PATHS } from '@/app/constants/stepsPaths';

// Helper to deduce cover image if not generated yet
const getCheckoutCover = (theme: string, generatedCover?: string) => {
   if (generatedCover) return generatedCover;

   const t = (theme || '').toLowerCase();
   if (t.includes('santa') || t.includes('christmas')) return 'https://image.pollinations.ai/prompt/christmas%20book%20cover%20santa%20workshop%20pixar%20style?width=400&height=600&nologo=true';
   if (t.includes('comic') || t.includes('super')) return 'https://image.pollinations.ai/prompt/comic%20book%20cover%20superhero%20kid%20action%20pose?width=400&height=600&nologo=true';
   if (t.includes('fantasy') || t.includes('magic')) return 'https://image.pollinations.ai/prompt/fantasy%20book%20cover%20dragon%20castle%20pixar%20style?width=400&height=600&nologo=true';
   return 'https://image.pollinations.ai/prompt/magical%20storybook%20cover%20generic%20fantasy?width=400&height=600&nologo=true';
};

export const Checkout: React.FC = () => {
   const router = useRouter();
   const { t, addCredits, config, generatedStory } = useStory();

   const isUnlimitedPlan = config?.selectedPlanId === 'unlimited';

   let planName = "Custom Storybook";
   let subtotal = 0;
   let discount = 0;
   let total = 0;
   let credits: number | 'Unlimited' = 0;

   // Page Count Logic
   const pageCount = config.customPageCount || 4; // Default to 4 if not set
   const pricePerPage = 0.99;

   if (isUnlimitedPlan) {
      // Family Pack Subscription Logic
      planName = "Family Pack";
      subtotal = 29.99;
      discount = 15.00;
      total = 14.99;
      credits = 'Unlimited';
   } else {
      // Single Story / Pay Per Page Logic
      planName = "Custom Storybook";
      // Calculate dynamic price: Pages * $0.99
      subtotal = pageCount * pricePerPage;
      discount = 0; // No discount on single purchase for now, or apply coupon if needed
      total = subtotal;
      credits = 1; // Effectively 1 story
   }

   const isSubscription = isUnlimitedPlan;
   const coverImage = getCheckoutCover(config.theme, generatedStory?.coverImage);

   const handlePayment = () => {
      // Simulate payment processing
      const btn = document.activeElement as HTMLButtonElement;
      if (btn) {
         btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
         btn.disabled = true;
      }
      setTimeout(() => {
         // Add credits based on plan
         const creditsToAdd = isUnlimitedPlan ? 999 : 1;
         addCredits(creditsToAdd);
         // Redirect to Upsell Sequence
         router.push(PATHS.UPSELL_BOOK);
      }, 2000);
   };

   return (
      <div className="flex flex-col items-center min-h-[80vh] px-4 py-12">
         <Button variant="ghost" onClick={() => router.back()} className="self-start mb-8 ml-4 md:ml-20 text-gray-400 hover:text-white"><i className="fa-solid fa-arrow-left"></i> {t('check_back')}</Button>

         <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">

            {/* Order Summary Component - Now contains the Pay Button */}
            <OrderSummary
               planName={planName}
               price={subtotal}
               discount={discount}
               total={total}
               credits={credits}
               coverImage={coverImage}
               isSubscription={isSubscription}
               pageCount={!isSubscription ? pageCount : undefined}
               onPay={handlePayment}
            />

            {/* Payment Form Component - Inputs Only */}
            <PaymentForm />

         </div>
      </div>
   );
};


export default Checkout;