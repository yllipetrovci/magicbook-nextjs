'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StoryConfig,
  DEFAULT_CONFIG,
  GeneratedStory,
  GeneratedVideo,
  GeneratedImage,
  ReadingStyle,
  VoiceStyle,
} from '../types';
import { MOCK_STORY, MOCK_VIDEO, MOCK_IMAGE } from './mocks';
import { LocalStorageService } from '../services/localStorageService';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';
import { clientFirestore } from '@/lib/firestore/firebaseClient';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export type AppTheme = 'default' | 'christmas';
const CACHE_TTL_MS = 1000 * 3; // 3seconds

interface StoryContextType {
  config: StoryConfig;
  setConfig: React.Dispatch<React.SetStateAction<StoryConfig>>;
  updateConfig: (field: keyof StoryConfig, value: any) => void;
  updateBatchConfigs: (configs: Partial<StoryConfig>) => void;
  resetStory: () => void;
  resetAll: () => void;
  storiesLoaded: boolean;
  setStoriesLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  stories: GeneratedStory[];
  setStories: React.Dispatch<React.SetStateAction<GeneratedStory[]>>;
  videos: GeneratedVideo[];
  setVideos: React.Dispatch<React.SetStateAction<GeneratedVideo[]>>;
  videosLoaded: boolean;
  setVideosLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  drawImages: GeneratedImage[];
  setDrawImages: React.Dispatch<React.SetStateAction<GeneratedImage[]>>;
  imagesLoaded: boolean;
  setImagesLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;
  setHasUpsellBook: React.Dispatch<React.SetStateAction<boolean>>,
  setHasUpsellVideo: React.Dispatch<React.SetStateAction<boolean>>,
  setHasUpsellDaily: React.Dispatch<React.SetStateAction<boolean>>,
  setMainPaymentIsDone: React.Dispatch<React.SetStateAction<boolean>>,
  hasUpSellBook: boolean
  hasUpSellVideo: boolean
  hasUpSellDaily: boolean
  mainPaymentIsDone: boolean,
  readingStyle: ReadingStyle;
  setReadingStyle: (style: ReadingStyle) => void;
  voiceStyle: VoiceStyle;
  setVoiceStyle: (style: VoiceStyle) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [config, setConfig] = useState<StoryConfig>(DEFAULT_CONFIG);
  const [appTheme, setAppTheme] = useState<AppTheme>('default');
  const [stories, setStories] = useState<GeneratedStory[]>([MOCK_STORY]);
  const [videos, setVideos] = useState<GeneratedVideo[]>([MOCK_VIDEO]);
  const [drawImages, setDrawImages] = useState<GeneratedImage[]>([MOCK_IMAGE]);
  const [hasUpSellBook, setHasUpsellBook] = useState<boolean>(false);
  const [hasUpSellVideo, setHasUpsellVideo] = useState<boolean>(false);
  const [hasUpSellDaily, setHasUpsellDaily] = useState<boolean>(false);
  const [mainPaymentIsDone, setMainPaymentIsDone] = useState<boolean>(false);
  const [readingStyle, setReadingStyle] = useState<ReadingStyle>(ReadingStyle.MODERN);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>(VoiceStyle.NARRATOR);
  const [storiesLoaded, setStoriesLoaded] = useState<boolean>(false);
  const [videosLoaded, setVideosLoaded] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
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

    const cachedStories = LocalStorageService.get<any>(
      LOCAL_STORAGE_KEYS.SAVED_STORIES,
      null
    );
    let hydratedStories = false;

    if (cachedStories) {
      if (Array.isArray(cachedStories)) {
        setStories(cachedStories);
        hydratedStories = true;
      } else if (
        typeof cachedStories === 'object' &&
        cachedStories !== null &&
        Array.isArray(cachedStories.stories)
      ) {
        const isFresh =
          typeof cachedStories.timestamp === 'number' &&
          Date.now() - cachedStories.timestamp <= CACHE_TTL_MS;

        if (isFresh) {
          setStories(cachedStories.stories);
          hydratedStories = true;
        } else {
          LocalStorageService.remove(LOCAL_STORAGE_KEYS.SAVED_STORIES);
        }
      }
    }

    const cachedVideos = LocalStorageService.get<any>(
      LOCAL_STORAGE_KEYS.SAVED_VIDEOS,
      null
    );
    let hydratedVideos = false;

    if (cachedVideos) {
      if (Array.isArray(cachedVideos)) {
        setVideos(cachedVideos);
        hydratedVideos = true;
      } else if (
        typeof cachedVideos === 'object' &&
        cachedVideos !== null &&
        Array.isArray(cachedVideos.videos)
      ) {
        const isFresh =
          typeof cachedVideos.timestamp === 'number' &&
          Date.now() - cachedVideos.timestamp <= CACHE_TTL_MS;

        if (isFresh) {
          setVideos(cachedVideos.videos);
          hydratedVideos = true;
        } else {
          LocalStorageService.remove(LOCAL_STORAGE_KEYS.SAVED_VIDEOS);
        }
      }
    }

    const cachedImages = LocalStorageService.get<any>(
      LOCAL_STORAGE_KEYS.SAVED_IMAGES,
      null
    );
    let hydratedImages = false;

    if (cachedImages) {
      if (Array.isArray(cachedImages)) {
        setDrawImages(cachedImages);
        hydratedImages = true;
      } else if (
        typeof cachedImages === 'object' &&
        cachedImages !== null &&
        Array.isArray(cachedImages.images)
      ) {
        const isFresh =
          typeof cachedImages.timestamp === 'number' &&
          Date.now() - cachedImages.timestamp <= CACHE_TTL_MS;

        if (isFresh) {
          setDrawImages(cachedImages.images);
          hydratedImages = true;
        } else {
          LocalStorageService.remove(LOCAL_STORAGE_KEYS.SAVED_IMAGES);
        }
      }
    }

    LocalStorageService.get<boolean>(
      LOCAL_STORAGE_KEYS.HAS_UPSELL_BOOK,
      false
    )

    setReadingStyle(
      LocalStorageService.get<ReadingStyle>(
        LOCAL_STORAGE_KEYS.READING_STYLE,
        ReadingStyle.MODERN
      )
    );

    setVoiceStyle(
      LocalStorageService.get<VoiceStyle>(
        LOCAL_STORAGE_KEYS.VOICE_STYLE,
        VoiceStyle.NARRATOR
      )
    );

    if (hydratedStories) {
      setStoriesLoaded(true);
    }
    if (hydratedVideos) {
      setVideosLoaded(true);
    }
    if (hydratedImages) {
      setImagesLoaded(true);
    }
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

  const resetAll = () => {
    setConfig(DEFAULT_CONFIG);
    setAppTheme('default');
    setStories([MOCK_STORY]);
    setVideos([MOCK_VIDEO]);
    setDrawImages([MOCK_IMAGE]);
    setHasUpsellBook(false);
    setHasUpsellVideo(false);
    setHasUpsellDaily(false);
    setMainPaymentIsDone(false);
    setReadingStyle(ReadingStyle.MODERN);
    setVoiceStyle(VoiceStyle.NARRATOR);

    // Clear all localStorage
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.STORY_CONFIG);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.GENERATED_STORY);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.SAVED_STORIES);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.SAVED_VIDEOS);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.SAVED_IMAGES);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.APP_THEME);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.MAIN_PAYMENT_DONE);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.HAS_UPSELL_BOOK);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.HAS_UPSELL_VIDEO);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.HAS_UPSELL_DAILY);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.READING_STYLE);
    LocalStorageService.remove(LOCAL_STORAGE_KEYS.VOICE_STYLE);
  };

  // 🔹 Persist changes
  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.STORY_CONFIG, config);
  }, [config]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.SAVED_STORIES, {
      stories,
      timestamp: Date.now(),
    });
  }, [stories]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.SAVED_VIDEOS, {
      videos,
      timestamp: Date.now(),
    });
  }, [videos]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.SAVED_IMAGES, {
      images: drawImages,
      timestamp: Date.now(),
    });
  }, [drawImages]);

  // useEffect(() => {
  //   if (!user?.uid) {
  //     return;
  //   }

  //   console.log("user.uid", user.uid);
  //   // const storiesRef = collection(clientFirestore, "users", user.uid, "stories");

  //   const storiesRef = collection(clientFirestore, "stories")


  //   const storiesQuery = query(storiesRef);
  //   const unsubscribe = onSnapshot(storiesQuery, (snapshot) => {
  //     debugger;
  //     const liveStories: any[] = snapshot.docs.map(doc => {
  //       const data = doc.data();
  //       const storyContent = data.storyContent || data;

  //       const createdAt =
  //         data.createdAt?.toDate?.() ??
  //         new Date();

  //       const status =
  //         typeof data.status === "string"
  //           ? data.status.toLowerCase()
  //           : "pending";

  //       return {
  //         id: doc.id,
  //         title: storyContent.title || "Untitled",
  //         author: storyContent.author || "Unknown",
  //         pages: storyContent.pages || [],
  //         coverImage: storyContent.coverImg || "",
  //         heroName: storyContent.heroName || "",
  //         status: ["completed", "processing", "pending", "failed"].includes(status)
  //           ? status
  //           : "pending",
  //         date: createdAt.toISOString(),
  //         formattedDate: createdAt.toLocaleDateString("en-US", { timeZone: "UTC" }),
  //       };
  //     });

  //     setStories(liveStories);
  //   });


  //   return () => unsubscribe();
  // }, [user?.uid, setStories]);

  useEffect(() => {
    if (!user?.uid) return;

    console.log("Subscribing for uid:", user.uid);

    const unsubscribe = onSnapshot(
      collection(clientFirestore, "users", user.uid, "stories"),
      snap => {
        debugger;        
        console.log("SNAPSHOT FIRED:", snap.size);
      }
    );

    return unsubscribe;
  }, [user?.uid]);

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

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.READING_STYLE, readingStyle);
  }, [readingStyle]);

  useEffect(() => {
    LocalStorageService.set(LOCAL_STORAGE_KEYS.VOICE_STYLE, voiceStyle);
  }, [voiceStyle]);

  return (
    <StoryContext.Provider
      value={{
        config,
        setConfig,
        updateConfig,
        updateBatchConfigs,
        resetStory,
        resetAll,
        stories,
        setStories,
        videos,
        setVideos,
        drawImages,
        setDrawImages,
        appTheme,
        setAppTheme,
        storiesLoaded,
        setStoriesLoaded,
        videosLoaded,
        setVideosLoaded,
        imagesLoaded,
        setImagesLoaded,
        setHasUpsellBook,
        setHasUpsellVideo,
        setHasUpsellDaily,
        hasUpSellBook,
        hasUpSellVideo,
        hasUpSellDaily,
        mainPaymentIsDone,
        setMainPaymentIsDone,
        readingStyle,
        setReadingStyle,
        voiceStyle,
        setVoiceStyle,
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
