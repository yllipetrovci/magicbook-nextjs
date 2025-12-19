import { Toaster } from "react-hot-toast";
import { RootLayoutClient } from "@/app/components/RootLayoutClient";
import { Providers } from "./providers";
import Script from "next/script";
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
        
        {/* Tawk.to Chat Widget */}
        <Script
          id="tawk-to-script"
          strategy="afterInteractive"
        >
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/694527b9722043197ba13c0f/1jcr26br1';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
