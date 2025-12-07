import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const url = new URL("/", req.url); // ✅ absolute URL

    const response = NextResponse.redirect(url);

    // delete session cookie
    response.cookies.set({
        name: "session",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
    });

    return response;
}
