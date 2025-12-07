import { getUserServer } from "@/lib/auth";
import { AuthProvider } from "@/app/contexts/AuthContext";
import DashboardClientLayout from "./DashboardClientLayout";
//import { redirect } from "next/navigation";
import { getUserVideos } from "@/lib/firestore/videos";
import { DecodedIdToken } from "firebase-admin/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user: DecodedIdToken | null = await getUserServer();
    const videos = user?.uid ? (await getUserVideos(user.uid)).videos : [];
    // if (!user) redirect("/login");
    // console.log({ ...user, videos }); // removed debug log
    return (
        <AuthProvider serverUser={{ ...user, videos }}>
            <DashboardClientLayout>{children}</DashboardClientLayout>
        </AuthProvider>
    );
}
