import { adminAuth } from "./firestore/firebaseAdmin";
import nookies from "nookies";

export async function getUserFromRequest(ctx: any) {
    try {
        const cookies = nookies.get(ctx);
        if (!cookies.session) return null;

        const decoded = await adminAuth.verifySessionCookie(cookies.session, true);
        return decoded;
    } catch (e) {
        return null;
    }
}

export async function requireAuth(ctx: any) {
    const user = await getUserFromRequest(ctx);

    if (!user) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: { user },
    };
}
