
import React from 'react';
import { TrustSection } from '@/app/components/TrustSection';
import { Button } from '@/app/components/Button';

interface OrderSummaryProps {
    planName: string;
    price: number;
    discount: number;
    total: number;
    credits: number | 'Unlimited';
    coverImage: string;
    isSubscription: boolean;
    pageCount?: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    planName,
    price,
    discount,
    total,
    credits,
    coverImage,
    isSubscription,
    pageCount
}) => {
    const pricePerStory = typeof credits === 'number' && credits > 0
        ? (total / credits).toFixed(2)
        : '0.00';

    console.log({ pricePerStory })
    console.log({price})
    return (
        <div className="flex-1 bg-magic-card p-8 rounded-3xl shadow-xl border border-white/5 h-fit flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>

            <div className="flex items-start gap-4 mb-6">
                <div className="w-24 h-32 bg-gray-900 rounded-lg overflow-hidden border border-white/10 relative shadow-lg group flex-shrink-0">
                    <img
                        src={coverImage}
                        alt="Book Cover"
                        className="w-full h-full object-cover blur-[2px] opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <i className="fa-solid fa-lock text-white/50 text-xl drop-shadow-md"></i>
                    </div>
                </div>

                <div>
                    <p className="font-bold text-gray-200 text-lg leading-tight mb-2">{planName}</p>

                    {/* Feature Breakdown */}
                    <div className="text-sm text-gray-400 mb-2 flex flex-col gap-1">
                        {isSubscription ? (
                            <span className="font-medium text-white flex items-center gap-2">
                                <i className="fa-solid fa-coins text-yellow-400 text-xs"></i>
                                Unlimited Stories
                            </span>
                        ) : (
                            <span className="font-medium text-white flex items-center gap-2">
                                <i className="fa-solid fa-book-open text-magic-blue text-xs"></i>
                                {pageCount} Page Story
                            </span>
                        )}

                        {/* Price Calculation for Single Story */}
                        {!isSubscription && pageCount && (
                            <div className="text-xs text-gray-500 font-mono mt-1">
                                {pageCount} pages x ${pricePerStory}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 py-4 space-y-2">
                <div className="flex justify-between text-gray-400 text-sm"><span>Subtotal</span><span>${price?.toFixed(2)}</span></div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-400 font-bold text-sm"><span>Coupon (MAGICFUN)</span><span>-${discount?.toFixed(2)}</span></div>
                )}
            </div>

            <div className="border-t border-white/10 py-4 mb-4">
                <div className="flex justify-between items-end">
                    <span className="text-xl font-bold text-white">Total</span>
                    <div className="text-right">
                        <span className="text-3xl font-black text-magic-orange block leading-none">${total}</span>
                        {isSubscription ? (
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-2 bg-white/5 px-2 py-1 rounded">
                                Billed Monthly • Cancel Anytime
                            </span>
                        ) : (
                            <span className="text-[10px] text-gray-500 font-medium block mt-1">
                                One-time payment
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Button moved here */}
            <TrustSection variant="minimal" className="mt-auto" />

            <div className="bg-green-500/10 p-4 rounded-xl mt-4 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <div className="flex items-center gap-2 text-green-400 font-bold mb-1 text-sm">
                    <i className="fa-solid fa-lock"></i> Secure Payment
                </div>
                <p className="text-xs text-green-300/70">Your payment information is encrypted and secure.</p>
            </div>
        </div>
    );
};
