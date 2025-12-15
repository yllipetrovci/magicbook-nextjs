import { Toaster } from "react-hot-toast";
import { RootLayoutClient } from "@/app/components/RootLayoutClient";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F9F8F6] flex flex-col font-sans">
        <Providers>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
