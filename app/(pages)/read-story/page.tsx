
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { BookReader } from './components/BookReader';
import { DUMMY_STORY } from '@/app/../dummyStore';

export const ReadStory: React.FC = () => {
  const router = useRouter();
  // const { generatedStory } = useStory();
  
  // Robust fallback: use DUMMY_STORY if generatedStory is null/undefined
  const storyToRead =  DUMMY_STORY; //generatedStory ||

  const handleClose = () => {
    router.push('/dashboard/library');
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* 3D Book Reader */}
      <BookReader 
        story={storyToRead} 
        onClose={handleClose}
        onComplete={() => console.log("Story Finished")}
      />
    </div>
  );
};

export default ReadStory;