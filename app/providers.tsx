"use client";
import { LanguageProvider } from "./contexts/LanguageContext";
import { StoryProvider } from "./contexts/StoryContext";
import { AuthProvider } from "./contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <StoryProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </StoryProvider>
        </AuthProvider>
    );
}
