
import React from 'react';

export const PhotoGuide: React.FC = () => {
  return (
    <div className="bg-magic-card/50 border border-white/10 rounded-2xl p-4 mb-8 grid grid-cols-2 gap-4 animate-fade-in">
        <div className="text-center">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 border-2 border-green-500">
                <img src="https://image.pollinations.ai/prompt/portrait%20photo%20of%20a%20child%20facing%20camera%20good%20lighting%20clear%20face?width=200&height=200&nologo=true" className="w-full h-full object-cover" alt="Good Example" />
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"><i className="fa-solid fa-check"></i></div>
            </div>
            <p className="text-green-400 font-bold text-xs">Good: Clear face, good light</p>
        </div>
        <div className="text-center">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 border-2 border-red-500">
                <img src="https://image.pollinations.ai/prompt/blurry%20dark%20photo%20of%20a%20child%20bad%20lighting%20unclear?width=200&height=200&nologo=true" className="w-full h-full object-cover grayscale opacity-70" alt="Bad Example" />
                <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"><i className="fa-solid fa-times"></i></div>
            </div>
            <p className="text-red-400 font-bold text-xs">Avoid: Blurry, dark, far away</p>
        </div>
    </div>
  );
};
