"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useStory } from "@/app/contexts/StoryContext";
import { DecodedIdToken } from "firebase-admin/auth";
import { GeneratedStory } from "@/app/types";

interface DashboardDataSetterProps {
    user: DecodedIdToken | null;
    userProfile?: Record<string, any> | null;
    stories?: any[] | null;
    videos?: any[] | null;
    drawings?: any[] | null;
    children: React.ReactNode;
}

export default function DashboardDataSetter({ user, userProfile, stories, videos, drawings, children }: DashboardDataSetterProps) {
    const { setUser } = useAuth();
    const {
        setStories,
        setVideos,
        setDrawImages,
        setStoriesLoaded,
        setVideosLoaded,
        setImagesLoaded,
    } = useStory();

    useEffect(() => {
        if (user) {
            setUser(prev => ({
                ...(prev || {}),
                ...(userProfile || {}),
                uid: user.uid,
                email: user.email || userProfile?.email || prev?.email || "",
                credits: userProfile?.credits ?? prev?.credits ?? 0,
            }));
        }
    }, [user, userProfile, setUser]);

    useEffect(() => {
        if (stories) {
            // Map Firestore stories to GeneratedStory format
            const mappedStories: GeneratedStory[] = stories.map((story: any) => {
                const createdAt =
                    story.createdAt instanceof Date
                        ? story.createdAt
                        : typeof story.createdAt === "string"
                            ? new Date(story.createdAt)
                            : new Date();

                return {
                    title: story.storyContent?.title || "Untitled",
                    author: story.storyContent?.author || "Unknown",
                    pages: story.storyContent?.pages || [],
                    date: createdAt.toISOString(),
                    coverImage: story.storyContent?.coverImg || "",
                    heroName: "", // Add if available
                    status: story.status || "pending",
                    formattedDate: createdAt.toLocaleDateString("en-US", { timeZone: "UTC" }),
                };
            });
            setStories(mappedStories);
        }
        setStoriesLoaded(true);
    }, [stories, setStories, setStoriesLoaded]);

    useEffect(() => {
        if (videos) {
            const mappedVideos = videos.map((video: any) => {
                const createdAt =
                    video.createdAt instanceof Date
                        ? video.createdAt
                        : typeof video.createdAt === "string"
                            ? new Date(video.createdAt)
                            : new Date();

                return {
                    id: video.videoId || video.id || `video-${video.taskId || Math.random()}`,
                    title: video.title || video.prompt || "Magic Video",
                    thumbnail: video.thumbnail || video.coverImage || "",
                    videoUrl: video.videoUrl || video.url || "",
                    date: createdAt.toISOString(),
                    duration: video.duration || video.length || "—",
                    formattedDate: createdAt.toLocaleDateString("en-US", { timeZone: "UTC" }),
                };
            });
            setVideos(mappedVideos);
        }
        setVideosLoaded(true);
    }, [videos, setVideos, setVideosLoaded]);

    useEffect(() => {
        if (drawings) {
            const mappedImages = drawings.map((image: any) => {
                const createdAt =
                    image.createdAt instanceof Date
                        ? image.createdAt
                        : typeof image.createdAt === "string"
                            ? new Date(image.createdAt)
                            : new Date();

                return {
                    id: image.imageId || image.id || `image-${Math.random()}`,
                    title: image.title || image.prompt || "Coloring Page",
                    imageUrl: image.imageUrl || image.url || "",
                    date: createdAt.toISOString(),
                    prompt: image.prompt || "",
                    formattedDate: createdAt.toLocaleDateString("en-US", { timeZone: "UTC" }),
                };
            });
            setDrawImages(mappedImages);
        }
        setImagesLoaded(true);
    }, [drawings, setDrawImages, setImagesLoaded]);

    return <>{children}</>;
}
