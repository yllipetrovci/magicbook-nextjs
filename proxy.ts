// proxy.ts
import { NextRequest, NextResponse } from "next/server";

// Routes that can be accessed only when logged OUT
const publicOnly = ["/", "/login"];

// Routes that require login
const protectedOnly = ["/dashboard"];

// Routes that are public for everyone
const alwaysPublic = [
    "/pricing",
    "/offer-coins",
    "/offer-custom-style",
    "/offer-priority",
    "/payment-processing",
    "/moment-ready",
    "/quiz-finished",
    "/order-confirmation",
    "/email-collection",
    "/animation-style",
    "/create",
    "/create-password",
];

export function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // 🚀 NEW: Always allow API routes (fixes logout)
    // if (pathname.startsWith("/api")) {
    //     return NextResponse.next();
    // }

    // const sessionCookie = req.cookies.get("session");
    // const isLoggedIn = Boolean(sessionCookie?.value);

    // const isPublicOnly = publicOnly.some((r) => pathname.startsWith(r));
    // const isProtected = protectedOnly.some((r) => pathname.startsWith(r));
    const isAlwaysPublic = true; //alwaysPublic.some((r) => pathname.startsWith(r));

    // 1. ALWAYS PUBLIC → allow
    // if (isAlwaysPublic) {
    //     return NextResponse.next();
    // }

    // // 2. Protected but NOT logged in → redirect to login
    // if (isProtected && !isLoggedIn) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    // // 3. Public-only pages but LOGGED IN → redirect to dashboard
    // if (isPublicOnly && isLoggedIn) {
    //     if (pathname !== "/dashboard" && pathname !== "/dashboard/get-coins") {
    //         return NextResponse.redirect(new URL("/dashboard", req.url));
    //     }
    // }

    // 4. Default allow
    return NextResponse.next();
}

export const config = {
    matcher: "/((?!_next|static|favicon.ico|assets).*)",
};
