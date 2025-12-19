"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useStory } from "@/app/contexts/StoryContext";
import { DecodedIdToken } from "firebase-admin/auth";
import { GeneratedStory } from "@/app/types";

interface DashboardDataSetterProps {
    user: DecodedIdToken | null;
    stories?: any[] | null;
    children: React.ReactNode;
}

export default function DashboardDataSetter({ user, stories, children }: DashboardDataSetterProps) {
    const { setUser } = useAuth();
    const { setStories } = useStory();

    useEffect(() => {
        if (user) {
            // Map DecodedIdToken to UserProfile format
            setUser({
                uid: user.uid,
                email: user.email || "",
                // Add other fields if available, or fetch from API
            });
        }
    }, [user, setUser]);

    useEffect(() => {
        if (stories) {
            // Map Firestore stories to GeneratedStory format
            const mappedStories: GeneratedStory[] = stories.map((story: any) => ({
                title: story.storyContent?.title || "Untitled",
                author: story.storyContent?.author || "Unknown",
                pages: story.storyContent?.pages || [],
                date: (story.createdAt instanceof Date ? story.createdAt.toISOString() : 
                      typeof story.createdAt === 'string' ? story.createdAt : 
                      new Date().toISOString()),
                coverImage: story.storyContent?.coverImg || "",
                heroName: "", // Add if available
                status: story.status || "pending",
            }));
            setStories(mappedStories);
        }
    }, [stories, setStories]);

    return <>{children}</>;
}