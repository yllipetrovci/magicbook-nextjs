
// 'use client'
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Button } from '@/app/components/Button';
// import { useStory } from '@/app/contexts/StoryContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { OrderSummary } from './components/OrderSummary';
// import { PATHS } from '@/app/constants/relativeRoutePaths';
// import { plans } from '@/lib/constants/plans';
// import { useLanguage } from '@/app/contexts/LanguageContext';
// import { getPaddle } from '@/lib/paddle';
// import { CheckoutEventNames, Paddle, PaddleEventData } from '@paddle/paddle-js';

// // Helper to deduce cover image if not generated yet
// const getCheckoutCover = (theme: string, generatedCover?: string) => {
//    if (generatedCover) return generatedCover;

//    const t = (theme || '').toLowerCase();
//    if (t.includes('santa') || t.includes('christmas')) return 'https://image.pollinations.ai/prompt/christmas%20book%20cover%20santa%20workshop%20pixar%20style?width=400&height=600&nologo=true';
//    if (t.includes('comic') || t.includes('super')) return 'https://image.pollinations.ai/prompt/comic%20book%20cover%20superhero%20kid%20action%20pose?width=400&height=600&nologo=true';
//    if (t.includes('fantasy') || t.includes('magic')) return 'https://image.pollinations.ai/prompt/fantasy%20book%20cover%20dragon%20castle%20pixar%20style?width=400&height=600&nologo=true';
//    return 'https://image.pollinations.ai/prompt/magical%20storybook%20cover%20generic%20fantasy?width=400&height=600&nologo=true';
// };

// export const Checkout: React.FC = () => {
//    const router = useRouter();
//    const searchParams = useSearchParams();
//    const { config, generatedStory, setMainPaymentIsDone }: any = useStory();
//    const { refreshUser } = useAuth();
//    const { t } = useLanguage();
//    const isDashboardFlow = searchParams.get("source") === "dashboard";
//    const [paddle, setPaddle] = useState<Paddle | null>(null);
//    const [paddleError, setPaddleError] = useState<string | null>(null);
//    const checkoutOpened = useRef(false);
//    const completionHandled = useRef(false);
//    const checkoutContainerRef = useRef<HTMLDivElement | null>(null);

//    const selectedPlan = plans.find(p => p.id === config?.planType);
//    const priceIdMap: Record<string, string | undefined> = {
//       free: '',
//       unlimited: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_UNLIMITED,
//       credits: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_CREDITS,
//    };
//    const priceId = selectedPlan ? priceIdMap[selectedPlan.id] : undefined;


//    // Page Count Logic
//    const pageCount = config.customPageCount || 4; // Default to 4 if not set

//    const coverImage = getCheckoutCover(config.theme, generatedStory?.coverImage);

//    const handlePaddleEvent = useCallback(async (event: PaddleEventData) => {
//       if (event.name !== CheckoutEventNames.CHECKOUT_COMPLETED) {
//          return;
//       }
//       if (completionHandled.current) return;
//       completionHandled.current = true;

//       if (isDashboardFlow) {
//          try {
//             const res = await fetch("/api/user/credits", {
//                method: "POST",
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify({ planId: selectedPlan?.id }),
//             });
//             if (!res.ok) {
//                console.error("Failed to add credits:", res.status);
//                return;
//             }
//             await refreshUser();
//             router.push(PATHS.DASHBOARD);
//          } catch (error) {
//             console.error("Checkout failed:", error);
//          }
//          return;
//       }

//       setMainPaymentIsDone(true);
//       router.push(PATHS.SUCCESS);
//    }, [isDashboardFlow, refreshUser, router, selectedPlan?.id, setMainPaymentIsDone]);

//    useEffect(() => {
//       completionHandled.current = false;
//    }, [selectedPlan?.id]);

//    useEffect(() => {
//       if (!priceId) {
//          setPaddleError("Missing Paddle price ID for this plan.");
//          return;
//       }
//       setPaddleError(null);
//       getPaddle()
//          .then((instance) => {
//             if (!instance) {
//                setPaddleError("Paddle failed to initialize.");
//                return;
//             }
//             instance.Update({
//                eventCallback: handlePaddleEvent,
//             });
//             setPaddle(instance);
//          })
//          .catch((error) => {
//             console.error("Paddle init error:", error);
//             setPaddleError("Paddle failed to initialize.");
//          });
//    }, [handlePaddleEvent, priceId]);

//    useEffect(() => {
//       checkoutOpened.current = false;
//    }, [priceId]);

//    useEffect(() => {
//       if (!paddle || !priceId || checkoutOpened.current) return;
//       if (typeof window === "undefined") return;

//       const tryOpen = () => {
//          if (checkoutOpened.current) return;
//          const target = document.getElementById("paddle-checkout");
//          if (!target) {
//             requestAnimationFrame(tryOpen);
//             return;
//          }
//          checkoutOpened.current = true;
//          paddle.Checkout.open({
//             items: [{ priceId:"pri_01kd2twhysy4fnrzj0krhn2rmx", quantity: 1 }],
//             // customData: {
//             //    planId: selectedPlan?.id,
//             //    source: isDashboardFlow ? "dashboard" : "public",
//             // },
//             settings: {
//                displayMode: "inline",
//                theme: "dark",
//                frameTarget: "#paddle-checkout",
//                frameInitialHeight: 520,
//                successUrl: window.location.href,
//             },
//          });
//       };

//       tryOpen();
//    }, [isDashboardFlow, paddle, priceId, selectedPlan?.id]);
//    const DISCOUNT_PRICE = selectedPlan?.price - (selectedPlan?.price * 0.5);
//    return (
//       <div className="flex flex-col items-center min-h-[80vh] px-4 py-12">
//          <Button variant="ghost" onClick={() => router.back()} className="self-start mb-8 ml-4 md:ml-20 text-gray-400 hover:text-white"><i className="fa-solid fa-arrow-left"></i> {t('check_back')}</Button>

//          <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">

//             {/* Order Summary Component - Now contains the Pay Button */}
//             <OrderSummary
//                planName={selectedPlan?.title}
//                price={selectedPlan?.price}
//                discount={DISCOUNT_PRICE}
//                total={parseFloat(DISCOUNT_PRICE.toFixed(2))}
//                credits={selectedPlan?.credits}
//                coverImage={coverImage}
//                isSubscription={selectedPlan?.isSubscription}
//                pageCount={pageCount}
//                priceDataInNumbers={}
//             />

//             {/* Paddle Inline Checkout */}
//             <div className="flex-[1.5] bg-magic-card p-8 rounded-3xl shadow-xl border border-white/5 h-fit">
//                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                   <i className="fa-regular fa-credit-card text-magic-orange"></i> Payment Details
//                </h3>

//                {paddleError ? (
//                   <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
//                      {paddleError}
//                   </div>
//                ) : (
//                   <div
//                      id="paddle-checkout"
//                      ref={checkoutContainerRef}
//                      className="min-h-[520px]"
//                   ></div>
//                )}

//                <div className="mt-4 text-xs text-gray-500">
//                   Your payment is processed securely by Paddle.
//                </div>

//             </div>

//          </div>
//       </div>
//    );
// };


// export default Checkout;
