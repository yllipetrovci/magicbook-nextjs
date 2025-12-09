'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants/stepsPaths";

export default function ShowCuponPage() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push(PATHS.GENERATING);
        }, 2000);
    }, []);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-magic-card p-8 rounded-3xl border-4 border-green-500 shadow-2xl text-center transform scale-110">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <i className="fa-solid fa-gift text-4xl text-white"></i>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Coupon Applied!</h2>
                <p className="text-gray-300 text-lg font-bold">3 FREE Pages Unlocked</p>
                <div className="mt-4 text-sm text-gray-400 animate-pulse">Applying magic...</div>
            </div>
        </div>
    );
}