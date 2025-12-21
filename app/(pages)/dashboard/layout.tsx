import { getStoriesServer, getUserServer, getVideosServer, getColoringPagesServer } from "@/lib/auth";
import { adminFirestore } from "@/lib/firestore/firebaseAdmin";
import DashboardClientLayout from "./DashboardClientLayout";
import { DecodedIdToken } from "firebase-admin/auth";
import DashboardDataSetter from "./DashboardDataSetter";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user: DecodedIdToken | null = await getUserServer();
    const [stories, videos, drawings, profileSnapshot] = await Promise.all([
        getStoriesServer(user?.user_id),
        getVideosServer(user?.user_id),
        getColoringPagesServer(user?.user_id),
        user
            ? adminFirestore.collection("users").doc(user.user_id).get()
            : Promise.resolve(null),
    ]);
    const profile = profileSnapshot?.exists
        ? {
            ...profileSnapshot.data(),
            createdAt: profileSnapshot.data()?.createdAt?.toDate?.() || profileSnapshot.data()?.createdAt || null,
            updatedAt: profileSnapshot.data()?.updatedAt?.toDate?.() || profileSnapshot.data()?.updatedAt || null,
        }
        : null;

    const serialize = (items: any[] | null) =>
        items
            ? items.map(item => ({
                ...item,
                createdAt: item.createdAt?.toDate?.() || item.createdAt || null,
                updatedAt: item.updatedAt?.toDate?.() || item.updatedAt || null,
            }))
            : null;

    const serializedStories = serialize(stories);
    const serializedVideos = serialize(videos);
    const serializedDrawings = serialize(drawings);

    return (
        <DashboardDataSetter
            user={user}
            userProfile={profile}
            stories={serializedStories}
            videos={serializedVideos}
            drawings={serializedDrawings}
        >
            <DashboardClientLayout>{children}</DashboardClientLayout>
        </DashboardDataSetter>
    );
}
