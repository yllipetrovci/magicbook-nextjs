"use client";
import { FunnelProvider } from "./contexts/FunnelContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { StoryProvider } from "./contexts/StoryContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <FunnelProvider>
            <StoryProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </StoryProvider>
        </FunnelProvider>
    );
}
