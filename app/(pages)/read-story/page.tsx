
'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { BookReader } from './components/BookReader';

export const ReadStory: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { stories } = useStory();
  
  const storyId = searchParams.get('id');
  const selectedStory = storyId
    ? stories.find(story => story.id === storyId)
    : undefined;

  const handleClose = () => {
    router.push('/dashboard');
  };

  if (!selectedStory) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
        Story not found.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* 3D Book Reader */}
      <BookReader 
        story={selectedStory} 
        onClose={handleClose}
        onComplete={() => console.log("Story Finished")}
      />
    </div>
  );
};

export default ReadStory;
