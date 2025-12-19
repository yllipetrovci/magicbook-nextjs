import { getStoriesServer, getUserServer } from "@/lib/auth";
import DashboardClientLayout from "./DashboardClientLayout";
import { DecodedIdToken } from "firebase-admin/auth";
import DashboardDataSetter from "./DashboardDataSetter";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user: DecodedIdToken | null = await getUserServer();
    const stories = await getStoriesServer(user?.user_id);
    
    // Serialize stories to make them compatible with client components
    const serializedStories = stories ? stories.map(story => ({
        ...story,
        createdAt: story.createdAt?.toDate?.() || story.createdAt,
        updatedAt: story.updatedAt?.toDate?.() || story.updatedAt,
    })) : null;
    
    return (
        <DashboardDataSetter user={user} stories={serializedStories}>
            <DashboardClientLayout>{children}</DashboardClientLayout>
        </DashboardDataSetter>
    );
}
