'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StoryConfig,
  DEFAULT_CONFIG,
  GeneratedStory,
  GeneratedVideo,
  GeneratedImage,
} from '../types';
import { MOCK_STORY, MOCK_VIDEO, MOCK_IMAGE } from './mocks';
import { LocalStorageService } from '../services/localStorageService';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

export type AppTheme = 'default' | 'christmas';

interface StoryContextType {
  config: StoryConfig;
  setConfig: React.Dispatch<React.SetStateAction<StoryConfig>>;
  updateConfig: (field: keyof StoryConfig, value: any) => void;
  updateBatchConfigs: (configs: Partial<StoryConfig>) => void;
  resetStory: () => void;
  stories: GeneratedStory[];
  videos: GeneratedVideo[];
  drawImages: GeneratedImage[];
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;

  setHasUpsellBook: React.Dispatch<React.SetStateAction<boolean>>,
  setHasUpsellVideo: React.Dispatch<React.SetStateAction<boolean>>,
  setHasUpsellDaily: React.Dispatch<React.SetStateAction<boolean>>,
  setMainPaymentIsDone: React.Dispatch<React.SetStateAction<boolean>>,
  hasUpSellBook: boolean
  hasUpSellVideo: boolean
  hasUpSellDaily: boolean
  mainPaymentIsDone: boolean
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<StoryConfig>(DEFAULT_CONFIG);
  const [appTheme, setAppTheme] = useState<AppTheme>('default');
  const [stories, setStories] = useState<GeneratedStory[]>([MOCK_STORY]);
  const [videos, setVideos] = useState<GeneratedVideo[]>([MOCK_VIDEO]);
  const [drawImages, setDrawImages] = useState<GeneratedImage[]>([MOCK_IMAGE]);
  const [hasUpSellBook, setHasUpsellBook] = useState<boolean>(false);
  const [hasUpSellVideo, setHasUpsellVideo] = useState<boolean>(false);
  const [hasUpSellDaily, setHasUpsellDaily] = useState<boolean>(false);
  const [mainPaymentIsDone, setMainPaymentIsDone] = useState<boolean>(false);
  // 🔹 Load from localStorage on mount
  useEffect(() => {
    setConfig(
      LocalStorageService.get(
        LOCAL_STORAGE_KEYS.STORY_CONFIG,
        DEFAULT_CONFIG
      )
    );

    setMainPaymentIsDone(
      LocalStorageService.get<boolean>(
        LOCAL_STORAGE_KEYS.MAIN_PAYMENT_DONE,
        false
      )
    )

    setAppTheme(
      LocalStorageService.get<AppTheme>(
        LOCAL_STORAGE_KEYS.APP_THEME,
        'default'
      )
    );

    setStories(
      LocalStorageService.get(
        LOCAL_STORAGE_KEYS.SAVED_STORIES,
        [MOCK_STORY]
      )
    );

    setVideos(
      LocalStorageService.get(
        LOCAL_STORAGE_KEYS.SAVED_VIDEOS,
        [MOCK_VIDEO]
      )
    );

    setDrawImages(
      LocalStorageService.get(
        LOCAL_STORAGE_KEYS.SAVED_IMAGES,
        [MOCK_IMAGE]
      )
    );

    LocalStorageService.get<boolean>(
      LOCAL_STORAGE_KEYS.HAS_UPSELL_BOOK,
      false
    )
  }, []);

  const updateConfig = (field: keyof StoryConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const updateBatchConfigs = (configs: Partial<StoryConfig>) => {
    setConfig(prev => ({ ...prev, ...configs }));
  };

  const resetStory = () => {
    setConfig(DEFAULT_CONFIG);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.STORY_CONFIG);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.GENERATED_STORY);
  };

  // 🔹 Persist changes
  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.STORY_CONFIG, config);
  }, [config]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.SAVED_IMAGES, drawImages);
  }, [drawImages]);

  // 🔹 Persist upsell states
  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.HAS_UPSELL_BOOK, hasUpSellBook);
  }, [hasUpSellBook]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.HAS_UPSELL_VIDEO, hasUpSellVideo);
  }, [hasUpSellVideo]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.HAS_UPSELL_DAILY, hasUpSellDaily);
  }, [hasUpSellDaily]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.APP_THEME, appTheme);
  }, [appTheme]);


  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.MAIN_PAYMENT_DONE, mainPaymentIsDone);
  }, [mainPaymentIsDone]);

  return (
    <StoryContext.Provider
      value={{
        config,
        setConfig,
        updateConfig,
        updateBatchConfigs,
        resetStory,
        stories,
        videos,
        drawImages,
        appTheme,
        setAppTheme,
        setHasUpsellBook,
        setHasUpsellVideo,
        setHasUpsellDaily,
        hasUpSellBook,
        hasUpSellVideo,
        hasUpSellDaily,
        mainPaymentIsDone, setMainPaymentIsDone
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};