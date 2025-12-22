// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { DASHBOARD_PATHS, PATHS, STEPS_PATHS } from "./app/constants/relativeRoutePaths";

// Routes that can be accessed only when logged OUT
const publicOnly = ["/", "/login"];

// Routes that require login
const protectedOnly = ["/dashboard", "/dashboard/read-story"];

// Routes that are public for everyone
const alwaysPublic = [
    STEPS_PATHS.STEP_1,
    STEPS_PATHS.STEP_2,
    STEPS_PATHS.STEP_3,
    STEPS_PATHS.STEP_4,
    STEPS_PATHS.STEP_5,
    STEPS_PATHS.STEP_6,
    PATHS.GENERATING,
    PATHS.PREVIEW,
    PATHS.GENERATING_2,
    PATHS.PRICING,
    PATHS.CHECKOUT,
    PATHS.RESET_PASSWORD,
    PATHS.SUCCESS,
];

export function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // 🚀 NEW: Always allow API routes (fixes logout)
    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    const sessionCookie = req.cookies.get("session");
    const isLoggedIn = Boolean(sessionCookie?.value);

    const isPublicOnly = publicOnly.some((r) => pathname === r);
    const isProtected = protectedOnly.some((r) => pathname.startsWith(r));
    const isAlwaysPublic = alwaysPublic.some((r) => pathname.startsWith(r));

    // 1. ALWAYS PUBLIC → allow
    if (isPublicOnly && isLoggedIn) {
        if (pathname !== DASHBOARD_PATHS.LIBRARY && pathname !== DASHBOARD_PATHS.CREDITS && pathname !== PATHS.READ_STORY && pathname !== DASHBOARD_PATHS.READING_STYLE
            && pathname !== DASHBOARD_PATHS.INVITE && pathname !== DASHBOARD_PATHS.COLORING && pathname !== DASHBOARD_PATHS.VIDEOS) {
            return NextResponse.redirect(new URL(DASHBOARD_PATHS.LIBRARY, req.url));
        }
    }

    // 3. Public-only pages but LOGGED IN → redirect to dashboard
    if (isAlwaysPublic) {
        return NextResponse.next();
    }

    // // 2. Protected but NOT logged in → redirect to login
    if (isProtected && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }


    // 4. Default allow
    return NextResponse.next();
}

export const config = {
    matcher: "/((?!_next|static|favicon.ico|assets).*)",
};
