'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants/relativeRoutePaths";

export default function ShowCuponPage() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push(PATHS.GENERATING);
        }, 3000);
    }, []);
    return (
        <div className="fixed inset-0 z-[200] vh-[100] flex items-center justify-center bg-[#0B0C15]/90 backdrop-blur-2xl animate-fade-in">
            {/* Moving Nebula Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magic-purple/20 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magic-blue/20 blur-[120px] rounded-full animate-pulse-slow delay-1000"></div>

            <div className="relative animate-float transform scale-110">
                {/* Prismatic Border Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-75 blur-xl animate-spin-slow"></div>

                {/* Glass Card */}
                <div className="relative bg-black/40 backdrop-blur-3xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 overflow-hidden max-w-sm w-full">

                    {/* Animated Lens Flare Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"></div>

                    {/* Floating Holographic Icon */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-magic-purple blur-2xl opacity-40 animate-pulse"></div>
                        <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl border border-white/30 flex items-center justify-center relative z-10 shadow-inner group">
                            <i className="fa-solid fa-gift text-4xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-purple-300 animate-bounce-slow"></i>
                        </div>
                    </div>

                    <div className="text-center space-y-2 relative z-10">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] animate-pulse">Security Verified</p>
                        <h2 className="text-4xl font-black text-white leading-none font-display">
                            MAGIC <br /> UNLOCKED
                        </h2>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    <div className="relative group cursor-default">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="bg-white/5 border border-white/20 px-8 py-4 rounded-2xl text-center relative overflow-hidden backdrop-blur-md">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Benefit Applied</span>
                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">3 FREE PAGES</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-black/40 px-5 py-2 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
                        <span className="text-[10px] font-bold text-green-300 uppercase tracking-widest">Storyteller status: ELITE</span>
                    </div>

                    <p className="text-gray-500 text-xs font-medium italic mt-2">"Initializing magical engine..."</p>
                </div>
            </div>
        </div>
    );
}