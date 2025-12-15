
import React from 'react';
import { AgeSelector } from './AgeSelector';
import { PageCountSelector } from './PageCountSelector';
import { GenderSelector } from './GenderSelector';

interface ReaderDetailsProps {
  gender: 'boy' | 'girl';
  age: number;
  pageCount: number;
  onGenderChange: (val: 'boy' | 'girl') => void;
  onAgeChange: (val: number) => void;
  onPageCountChange: (val: number) => void;
  errors?: any;
}

export const ReaderDetails: React.FC<ReaderDetailsProps> = ({
  gender,
  age,
  pageCount,
  onGenderChange,
  onAgeChange,
  onPageCountChange,
  errors
}) => {
  return (
    <div className="bg-magic-card p-6 md:p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        {/* Background Shine */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-magic-purple/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <label className="text-white font-bold text-xl mb-6 block flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-magic-blue/20 rounded-xl flex items-center justify-center text-magic-blue border border-magic-blue/30">
                <i className="fa-solid fa-child-reaching"></i>
            </div>
            Reader Details
        </label>
        
        <div className="relative z-10">
            {/* Row 1: Gender and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 mb-8">
                {/* Gender Selector - Left Column */}
                <div>
                    <GenderSelector 
                        value={gender} 
                        onChange={onGenderChange} 
                    />
                    {errors?.gender && <p className="text-red-400 text-sm mt-2 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.gender.message}</p>}
                </div>

                {/* Age Selector - Right Column */}
                <div>
                    <AgeSelector 
                        value={age} 
                        onChange={onAgeChange} 
                    />
                    {errors?.childAge && <p className="text-red-400 text-sm mt-2 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.childAge.message}</p>}
                </div>
            </div>

            {/* Row 2: Page Count (Full Width) */}
            <div className="border-t border-white/5 pt-6">
                <PageCountSelector 
                    value={pageCount} 
                    onChange={onPageCountChange} 
                />
                {errors?.customPageCount && <p className="text-red-400 text-sm mt-2 font-bold"><i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.customPageCount.message}</p>}
            </div>
        </div>
    </div>
  );
};
