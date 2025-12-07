'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoryConfig, DEFAULT_CONFIG, GeneratedStory, GeneratedVideo, GeneratedImage, User } from '../types';
import { Language, translations } from '../utils/translations';
import { MOCK_STORY, MOCK_VIDEO, MOCK_IMAGE } from './mocks';

export type AppTheme = 'default' | 'christmas';

interface StoryContextType {
  config: StoryConfig;
  setConfig: React.Dispatch<React.SetStateAction<StoryConfig>>;
  generatedStory: GeneratedStory | null;
  setGeneratedStory: React.Dispatch<React.SetStateAction<GeneratedStory | null>>;
  updateConfig: (field: keyof StoryConfig, value: any) => void;
  updateBatchConfigs: (configs: Partial<StoryConfig>) => void;

  resetStory: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  savedStories: GeneratedStory[];
  savedVideos: GeneratedVideo[];
  savedImages: GeneratedImage[];
  saveCurrentStory: () => void;
  addVideo: (video: GeneratedVideo) => void;
  addImage: (image: GeneratedImage) => void;
  deleteStory: (index: number) => void;
  deleteVideo: (id: string) => void;
  deleteImage: (id: string) => void;
  addCredits: (amount: number) => void;
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;
}



const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage if available to persist state across refreshes
  const [config, setConfig] = useState<StoryConfig>(() => {
    try {
      const saved = localStorage.getItem('story_config');
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch (e) {
      console.warn('Failed to load config from storage', e);
      return DEFAULT_CONFIG;
    }
  });

  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(() => {
    try {
      const saved = localStorage.getItem('generated_story');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn('Failed to load story from storage', e);
      return null;
    }
  });

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_language');
      return (saved as Language) || 'en';
    } catch (e) {
      return 'en';
    }
  });


  const updateBatchConfigs = (configs: Partial<StoryConfig>) => {
    setConfig(prev => ({ ...prev, ...configs }));
  };

  const [appTheme, setAppTheme] = useState<AppTheme>(() => {
    try {
      return (localStorage.getItem('app_theme') as AppTheme) || 'default';
    } catch (e) {
      return 'default';
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('story_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure credits exist for backward compatibility
        return { credits: 3, ...parsed };
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  const [savedStories, setSavedStories] = useState<GeneratedStory[]>(() => {
    try {
      const saved = localStorage.getItem('saved_stories');
      if (saved) {
        return JSON.parse(saved);
      }
      return [MOCK_STORY];
    } catch (e) {
      return [MOCK_STORY];
    }
  });

  const [savedVideos, setSavedVideos] = useState<GeneratedVideo[]>(() => {
    try {
      const saved = localStorage.getItem('saved_videos');
      if (saved) {
        return JSON.parse(saved);
      }
      return [MOCK_VIDEO];
    } catch (e) {
      return [MOCK_VIDEO];
    }
  });

  const [savedImages, setSavedImages] = useState<GeneratedImage[]>(() => {
    try {
      const saved = localStorage.getItem('saved_images');
      if (saved) {
        return JSON.parse(saved);
      }
      return [MOCK_IMAGE];
    } catch (e) {
      return [MOCK_IMAGE];
    }
  });

  // Persist config changes
  useEffect(() => {
    try {
      localStorage.setItem('story_config', JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save config', e);
    }
  }, [config]);

  // Persist story changes
  useEffect(() => {
    try {
      if (generatedStory) {
        localStorage.setItem('generated_story', JSON.stringify(generatedStory));
      } else {
        localStorage.removeItem('generated_story');
      }
    } catch (e) {
      console.warn('Failed to save story', e);
    }
  }, [generatedStory]);

  // Persist language changes
  useEffect(() => {
    try {
      localStorage.setItem('app_language', language);
    } catch (e) {
      console.warn('Failed to save language', e);
    }
  }, [language]);

  // Persist theme changes
  useEffect(() => {
    try {
      localStorage.setItem('app_theme', appTheme);
    } catch (e) {
      console.warn('Failed to save theme', e);
    }
  }, [appTheme]);

  // Persist user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('story_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('story_user');
      }
    } catch (e) {
      console.warn('Failed to save user', e);
    }
  }, [user]);

  // Persist saved stories
  useEffect(() => {
    try {
      localStorage.setItem('saved_stories', JSON.stringify(savedStories));
    } catch (e) {
      console.warn('Failed to save stories', e);
    }
  }, [savedStories]);

  // Persist saved videos
  useEffect(() => {
    try {
      localStorage.setItem('saved_videos', JSON.stringify(savedVideos));
    } catch (e) {
      console.warn('Failed to save videos', e);
    }
  }, [savedVideos]);

  // Persist saved images
  useEffect(() => {
    try {
      localStorage.setItem('saved_images', JSON.stringify(savedImages));
    } catch (e) {
      console.warn('Failed to save images', e);
    }
  }, [savedImages]);

  const updateConfig = (field: keyof StoryConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const resetStory = () => {
    setConfig(DEFAULT_CONFIG);
    setGeneratedStory(null);
    localStorage.removeItem('story_config');
    localStorage.removeItem('generated_story');
  };

  const login = (email: string, name: string) => {
    setUser({
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=b6e3f4`,
      credits: 3 // DEFAULT CREDITS SET TO 3
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: (user.credits || 0) + amount });
    }
  };

  const saveCurrentStory = () => {
    if (generatedStory) {
      if (!savedStories.some(s => s.title === generatedStory.title)) {
        // Ensure heroName is attached if it wasn't in the object
        const storyToSave = {
          ...generatedStory,
          heroName: generatedStory.heroName || config.heroName
        };
        setSavedStories(prev => [storyToSave, ...prev]);
      }
    }
  };

  const addVideo = (video: GeneratedVideo) => {
    setSavedVideos(prev => [video, ...prev]);
  };

  const addImage = (image: GeneratedImage) => {
    setSavedImages(prev => [image, ...prev]);
  };

  const deleteStory = (index: number) => {
    setSavedStories(prev => prev.filter((_, i) => i !== index));
  };

  const deleteVideo = (id: string) => {
    setSavedVideos(prev => prev.filter(v => v.id !== id));
  };

  const deleteImage = (id: string) => {
    setSavedImages(prev => prev.filter(i => i.id !== id));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <StoryContext.Provider value={{
      config, setConfig,
      generatedStory, setGeneratedStory,
      updateConfig, resetStory,
      language, setLanguage, t,
      user, login, logout,
      savedStories, savedVideos, savedImages,
      saveCurrentStory, addVideo, addImage,
      deleteStory, deleteVideo, deleteImage,
      updateBatchConfigs,
      addCredits,
      appTheme, setAppTheme
    }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) throw new Error('useStory must be used within a StoryProvider');
  return context;
};
