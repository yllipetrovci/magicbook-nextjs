
'use client'
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { useStory } from '@/app/contexts/StoryContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { OrderSummary } from './components/OrderSummary';
import { PaymentForm } from './components/PaymentForm';
import { PATHS } from '@/app/constants/relativeRoutePaths';
import { plans } from '@/lib/constants/plans';
import { useLanguage } from '@/app/contexts/LanguageContext';

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
   const searchParams = useSearchParams();
   const { config, generatedStory, setMainPaymentIsDone }: any = useStory();
   const { refreshUser } = useAuth();
   const { t } = useLanguage();
   const isDashboardFlow = searchParams.get("source") === "dashboard";

   const selectedPlan = plans.find(p => p.id === config?.planType);


   // Page Count Logic
   const pageCount = config.customPageCount || 4; // Default to 4 if not set

   const coverImage = getCheckoutCover(config.theme, generatedStory?.coverImage);

   const handlePayment = async () => {
      // Simulate payment processing
      const btn = document.activeElement as HTMLButtonElement;
      if (btn) {
         btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
         btn.disabled = true;
      }

      if (isDashboardFlow) {
         try {
            const res = await fetch("/api/user/credits", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ planId: selectedPlan?.id }),
            });
            if (!res.ok) {
               console.error("Failed to add credits:", res.status);
               return;
            }
            await refreshUser();
            router.push(PATHS.DASHBOARD);
            return;
         } catch (error) {
            console.error("Checkout failed:", error);
            return;
         }
      }

      setMainPaymentIsDone(true);
      setTimeout(() => {
         router.push(PATHS.SUCCESS);
      }, 2000);
   };
   const DISCOUNT_PRICE = selectedPlan?.price - (selectedPlan?.price * 0.5);
   return (
      <div className="flex flex-col items-center min-h-[80vh] px-4 py-12">
         <Button variant="ghost" onClick={() => router.back()} className="self-start mb-8 ml-4 md:ml-20 text-gray-400 hover:text-white"><i className="fa-solid fa-arrow-left"></i> {t('check_back')}</Button>

         <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">

            {/* Order Summary Component - Now contains the Pay Button */}
            <OrderSummary
               planName={selectedPlan?.title}
               price={selectedPlan?.price}
               discount={DISCOUNT_PRICE}
               total={parseFloat(DISCOUNT_PRICE.toFixed(2))}
               credits={selectedPlan?.credits}
               coverImage={coverImage}
               isSubscription={selectedPlan?.isSubscription}
               pageCount={pageCount}
            />

            {/* Payment Form Component - Inputs Only */}
            <PaymentForm onSubmit={handlePayment} />

         </div>
      </div>
   );
};


export default Checkout;
