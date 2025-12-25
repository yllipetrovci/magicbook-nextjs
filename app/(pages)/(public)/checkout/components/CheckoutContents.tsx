'use client';
// import { CheckoutFormGradients } from '@/components/gradients/checkout-form-gradients';
import { type Environments, initializePaddle, type Paddle } from '@paddle/paddle-js';
import type { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import throttle from 'lodash.throttle';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { plans } from '@/lib/constants/plans';
import { useStory } from '@/app/contexts/StoryContext';
import { usePaddlePrices } from '@/app/hooks/usePaddle';
import { PATHS } from '@/app/constants/relativeRoutePaths';



interface PathParams {
    priceId: string;
    [key: string]: string | string[];
}

interface Props {
    userEmail?: string;
}

const getCheckoutCover = (theme: string, generatedCover?: string) => {
    if (generatedCover) return generatedCover;

    const t = (theme || '').toLowerCase();
    if (t.includes('santa') || t.includes('christmas')) return 'https://image.pollinations.ai/prompt/christmas%20book%20cover%20santa%20workshop%20pixar%20style?width=400&height=600&nologo=true';
    if (t.includes('comic') || t.includes('super')) return 'https://image.pollinations.ai/prompt/comic%20book%20cover%20superhero%20kid%20action%20pose?width=400&height=600&nologo=true';
    if (t.includes('fantasy') || t.includes('magic')) return 'https://image.pollinations.ai/prompt/fantasy%20book%20cover%20dragon%20castle%20pixar%20style?width=400&height=600&nologo=true';
    return 'https://image.pollinations.ai/prompt/magical%20storybook%20cover%20generic%20fantasy?width=400&height=600&nologo=true';
};


export function CheckoutContents({ userEmail }: Props) {
    const { priceId } = useParams<PathParams>();
    const [quantity, setQuantity] = useState<number>(1);
    const router = useRouter();
    const [paddle, setPaddle] = useState<Paddle | undefined>();
    const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);
    const { config, generatedStory, setMainPaymentIsDone }: any = useStory();
    const country = 'US';
    const { pricesData, loading } = usePaddlePrices(paddle, country);

    const handleCheckoutEvents = (event: CheckoutEventsData) => {
        setCheckoutData(event);
    };

    const updateItems = useCallback(
        throttle((paddle: Paddle, priceId: string, quantity: number) => {
            paddle.Checkout.updateItems([{ priceId, quantity }]);
            // router.push(PATHS.SUCCESS)

        }, 1000),
        [],
    );


    const coverImage = getCheckoutCover(config.theme, generatedStory?.coverImage);

    useEffect(() => {
        if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
            initializePaddle({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
                eventCallback: (event) => {
                    debugger;
                    if (event.data && event.name) {
                        handleCheckoutEvents(event.data);
                    }

                    if (event.name === 'checkout.completed') {
                        // router.push(PATHS.SUCCESS);
                        console.log("SAVE DATA AND REDIRECT TO SUCCESS PAGE");
                    }


                },
                checkout: {
                    settings: {
                        variant: 'one-page',
                        displayMode: 'inline',
                        theme: 'dark',
                        allowLogout: !userEmail,
                        frameTarget: 'paddle-checkout-frame',
                        frameInitialHeight: 450,
                        frameStyle: 'width: 100%; background-color: transparent; border: none',
                        successUrl: PATHS.SUCCESS,
                    },
                },
            }).then(async (paddle) => {
                if (paddle && priceId) {
                    console.log('Paddle initialized in checkout component');
                    setPaddle(paddle);
                    paddle.Checkout.open({
                        ...(userEmail && { customer: { email: userEmail } }),
                        items: [{ priceId: priceId, quantity: 1 }],
                    });
                }
            });
        }
    }, [paddle?.Initialized, priceId, userEmail]);

    useEffect(() => {
        if (paddle && priceId && paddle.Initialized) {
            updateItems(paddle, priceId, quantity);
        }
    }, [paddle, priceId, quantity, updateItems]);

    const selectedPlan: any = plans.filter((plan) => plan.priceId === priceId);
    const DISCOUNT_PRICE = 10 //selectedPlan?.price - (selectedPlan?.price * 0.5);
    const pageCount = config.customPageCount || 4; // Default to 4 if not set


    // prices[selectedPlan.priceId].total = DISCOUNT_PRICE;


    //  acc[item.price.id] = {
    //         total: item.formattedTotals.total,
    //         totalsNumber: {
    //             discount: parseInt(item.totals.discount),
    //             subtotal: parseInt(item.totals.subtotal),
    //             tax: parseInt(item.totals.tax),
    //             total: parseInt(item.totals.total)
    //         },
    //         formattedTotals: item.formattedTotals,
    //         subtotalNumber: parseInt(item.totals.subtotal),
    //         customData,
    //     };
    return (
        <div
            className=
            'rounded-lg md:bg-background/80 md:backdrop-blur-[24px] md:p-10 md:pl-16 md:pt-16 md:min-h-[400px] flex flex-col justify-between relative'

        >
            {/* <CheckoutFormGradients /> */}
            <div className={'flex flex-col md:flex-row gap-8 md:gap-16'}>
                <div className={'w-full md:w-[400px]'}>
                    {/* <PriceSection checkoutData={checkoutData} quantity={1} handleQuantityChange={setQuantity} /> */}
                    <OrderSummary
                        planName={selectedPlan.title}
                        price={pricesData[priceId]?.formattedTotals.subtotal}
                        tax={pricesData[priceId]?.formattedTotals.tax}
                        discount={pricesData[priceId]?.formattedTotals.discount}
                        total={pricesData[priceId]?.formattedTotals.total}
                        credits={parseInt(String(pricesData[priceId]?.customData?.credits ?? '0'))}
                        coverImage={coverImage}
                        isSubscription={pricesData[priceId]?.isSubscribe}
                        pageCount={pageCount}
                        priceDataInNumbers={pricesData[priceId]?.totalsNumber}
                    />

                </div>
                <div className={'min-w-[375px] lg:min-w-[535px]'}>
                    <div className={'text-base leading-[20px] font-semibold mb-8'}>Payment details</div>
                    <div className={'paddle-checkout-frame'} />
                </div>
            </div>
        </div>
    );
}
