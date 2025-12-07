// Mocking firebase for the template to work without valid config/package
// This resolves the errors: Module '"firebase/auth"' has no exported member...

const auth = {
    currentUser: null
};
const db = {};
const storage = {};

// Mock functions that would normally come from firebase/auth
export const onAuthStateChanged = (authInstance: any, callback: (user: any) => void) => {
    // Simulate auth state check - default to null
    callback(null);
    return () => { }; // unsubscribe function
};

export const signInWithPopup = async (authInstance: any, provider: any) => {
    console.log("Mock signInWithPopup called");
    return {
        user: {
            uid: 'mock-user-123',
            email: 'user@example.com',
            displayName: 'Mock User',
            photoURL: null
        }
    };
};

export const signOut = async (authInstance: any) => {
    console.log("Mock signOut called");
};

export class GoogleAuthProvider { }

// Mock User type for TS compatibility
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export { auth, db, storage };