
import React, { createContext, useContext, useState, ReactNode } from 'react';
// Define the shape of our funnel data
export interface FunnelState {
  email: string;
  selectedPlanId: string;
  image: string | null; // Storing as base64 string for the demo
  animationStyle: string | null;
  upgrades: {
    customStyle: boolean;
    priority: boolean;
    coins: boolean;
  };
}

interface FunnelContextType {
  funnelData: FunnelState;
  setEmail: (email: string) => void;
  setPlan: (planId: string) => void;
  setImage: (image: string) => void;
  setAnimationStyle: (styleId: string) => void;
  toggleUpgrade: (key: keyof FunnelState['upgrades'], value: boolean) => void;
  resetFunnel: () => void;
}

const defaultState: FunnelState = {
  email: '',
  selectedPlanId: '2-month', // Default plan
  image: null,
  animationStyle: null,
  upgrades: {
    customStyle: false,
    priority: false,
    coins: false,
  },
};

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

export const FunnelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [funnelData, setFunnelData] = useState<FunnelState>(defaultState);

  const setEmail = (email: string) => {
    setFunnelData((prev) => ({ ...prev, email }));
  };

  const setPlan = (planId: string) => {
    setFunnelData((prev) => ({ ...prev, selectedPlanId: planId }));
  };

  const setImage = (image: string) => {
    setFunnelData((prev) => ({ ...prev, image }));
  };

  const setAnimationStyle = (styleId: string) => {
    setFunnelData((prev) => ({ ...prev, animationStyle: styleId }));
  };

  const toggleUpgrade = (key: keyof FunnelState['upgrades'], value: boolean) => {
    setFunnelData((prev) => ({
      ...prev,
      upgrades: {
        ...prev.upgrades,
        [key]: value,
      },
    }));
  };

  const resetFunnel = () => {
    setFunnelData(defaultState);
  };

  return (
    <FunnelContext.Provider value={{ funnelData, setEmail, setPlan, setImage, setAnimationStyle, toggleUpgrade, resetFunnel }}>
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (context === undefined) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
};
