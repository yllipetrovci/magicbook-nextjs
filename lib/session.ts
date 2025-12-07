import { cookies } from 'next/headers';
import { auth } from './firestore/firebaseAdmin';

const SESSION_COOKIE_NAME = 'session';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 5; // 5 days

export interface SessionUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

/**
 * Create a session cookie from a Firebase ID token
 */
export async function createSessionCookie(idToken: string): Promise<string> {
    try {
        // Create session cookie with 5 day expiration
        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn: SESSION_COOKIE_MAX_AGE * 1000,
        });

        return sessionCookie;
    } catch (error) {
        console.error('Error creating session cookie:', error);
        throw new Error('Failed to create session');
    }
}

/**
 * Verify and decode a session cookie
 */
export async function verifySessionCookie(sessionCookie: string): Promise<SessionUser | null> {
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        return {
            uid: decodedClaims.uid,
            email: decodedClaims.email || null,
            displayName: decodedClaims.name || null,
            photoURL: decodedClaims.picture || null,
        };
    } catch (error) {
        console.error('Error verifying session cookie:', error);
        return null;
    }
}

/**
 * Get the current user from server-side session cookie
 */
export async function getServerSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
        return null;
    }

    return verifySessionCookie(sessionCookie);
}

/**
 * Set session cookie in response
 */
export function setSessionCookie(sessionCookie: string) {
    const cookieStore = cookies();

    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_COOKIE_MAX_AGE,
        path: '/',
    });
}

/**
 * Clear session cookie
 */
export function clearSessionCookie() {
    const cookieStore = cookies();

    cookieStore.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    });
}
