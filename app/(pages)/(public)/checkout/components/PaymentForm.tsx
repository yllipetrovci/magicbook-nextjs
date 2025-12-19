
import { Button } from '@/app/components';
import React from 'react';
import { useRouter } from "next/navigation";
import { PATHS } from '@/app/constants/relativeRoutePaths';


interface PaymentFormProps {
    // total prop is no longer needed for button, but keeping interface clean
    onSubmit?: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
    const router = useRouter();
    return (
        <div className="flex-[1.5] bg-magic-card p-8 rounded-3xl shadow-xl border border-white/5 h-fit">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <i className="fa-regular fa-credit-card text-magic-orange"></i> Payment Details
            </h3>

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
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600 font-mono" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600 font-mono" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full p-4 bg-magic-bg rounded-xl border border-white/10 outline-none focus:border-magic-orange text-white placeholder-gray-600 font-mono" />
                    </div>
                </div>

                <Button fullWidth onClick={onSubmit} size="lg" className="shadow-lg shadow-orange-500/20 text-xl py-4 bg-magic-orange hover:bg-orange-600 border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all mb-6">
                    Order Now
                </Button>

                <p className="text-center text-xs text-gray-500 mt-4">By purchasing you agree to our terms of service.</p>
            </div>
        </div>
    );
};
