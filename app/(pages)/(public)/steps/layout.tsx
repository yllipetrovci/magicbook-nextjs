"use client";

import { usePathname, useRouter } from "next/navigation";
import { CreationStepper, BookGallery, Button } from "@/app/components";

export default function MagicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const step = pathname.split("/").filter(Boolean).pop() || "";

    return (
        <div className="flex flex-col items-center min-h-[60vh] w-full">
            <div className="flex flex-col items-center justify-center px-4 max-w-5xl mx-auto py-8 w-full mb-12">

                {/* Shared stepper component */}
                <CreationStepper currentStep={step} />

                <div className="w-full max-w-5xl mb-2 px-2">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-gray-400 hover:text-white pl-0"
                    >
                        <i className="fa-solid fa-arrow-left mr-2"></i> Back
                    </Button>
                </div>
            </div>

            {children}

            <BookGallery />
        </div>
    );
}
