
import React from 'react';

interface CreationStepperProps {
  currentStep: string; //'hero' | 'creator' | 'adventure' | 'customize';
}

export const CreationStepper: React.FC<CreationStepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 'name', label: 'Hero Name' },
    // { id: 'whos-creating-it', label: 'Who’s creating it' },
    // { id: 'upload', label: 'Upload' },
    { id: 'style', label: 'Pick Style' },
    { id: 'adventure', label: 'Pick Adventure' },
    { id: 'customize-and-finish', label: 'Customize & Finish' },
  ];

  const stepIds = steps.map(s => s.id);
  const currentIndex = currentStep != 'upload' && currentStep != 'whos-creating-it'
    ? stepIds.indexOf(currentStep)
    : 0;


  return (
    <div className="w-full max-w-4xl mx-auto mb-5 px-4 animate-fade-in relative z-20">
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between relative pb-6">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 w-full h-1 bg-white/10 -z-10 rounded-full"></div>

        {/* Active Progress Bar */}
        <div
          className="absolute top-5 left-0 h-1 bg-gradient-to-r from-magic-orange to-magic-purple -z-10 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3 relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${isActive
                  ? 'bg-magic-orange border-magic-orange text-white scale-125 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                  : isCompleted
                    ? 'bg-magic-purple border-magic-purple text-white'
                    : 'bg-magic-card border-white/10 text-gray-600'
                  }`}
              >
                {isCompleted ? (
                  <i className="fa-solid fa-check text-sm"></i>
                ) : (
                  <span className="font-bold text-sm font-mono">{idx + 1}</span>
                )}
              </div>
              <span className={`absolute top-12 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-white drop-shadow-md' : isCompleted ? 'text-magic-purple' : 'text-gray-600'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
          <span className="text-magic-orange">Step {currentIndex + 1} of {steps.length}</span>
          <span className="text-white text-right">{steps[currentIndex].label}</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-magic-orange to-magic-purple transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
