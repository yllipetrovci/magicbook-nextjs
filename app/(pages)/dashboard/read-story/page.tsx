
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
// import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { BookReader } from '@/app/components/BookReader';
import { DUMMY_STORY } from '@/dummyStore';

export const ReadStory: React.FC = () => {
  const router = useRouter();
  // const { generatedStory } = useStory();

  // Robust fallback: use DUMMY_STORY if generatedStory is null/undefined
  const storyToRead = DUMMY_STORY; //generatedStory || DUMMY_STORY;

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 py-8 animate-fade-in relative w-full overflow-x-hidden bg-[#0B0C15]">

      {/* Header */}
      <div className="absolute top-4 left-4 md:left-8 z-50">
        <Button variant="ghost" onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
          <i className="fa-solid fa-arrow-left mr-2"></i> Library
        </Button>
      </div>

      {/* 3D Book Reader */}
      <BookReader
        story={storyToRead}
        onComplete={() => console.log("Story Finished")}
      />
    </div>
  );
};


export default ReadStory;