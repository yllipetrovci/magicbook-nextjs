
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useStory } from '@/app/contexts/StoryContext';
import { Button } from '@/app/components/Button';
import { ColoringCard } from '../components/ColoringCard';
import { DashboardSection } from '../components/DashboardSection';
import { GeneratedImage } from '@/app/types';

export const Coloring: React.FC = () => {
    const router = useRouter();
    const { savedImages, t, deleteImage } = useStory();

    const handleCreateNewDrawing = () => {
        router.push('/create-drawing');
    };

    const handlePrintDrawing = (e: React.MouseEvent, img: GeneratedImage) => {
        e.stopPropagation();
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
            <html>
              <head><title>Print ${img.title}</title></head>
              <body style="text-align:center;">
                <img src="${img.imageUrl}" style="max-width:100%; max-height:100vh;" onload="window.print();window.close()" />
              </body>
            </html>
          `);
            printWindow.document.close();
        }
    };

    return (
        <>
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-magic-card/30 p-6 rounded-3xl border border-white/5 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1 drop-shadow-lg flex items-center gap-2">
                        Coloring Corner <i className="fa-solid fa-palette text-magic-blue ml-2"></i>
                    </h1>
                    <p className="text-gray-400 text-sm font-bold">
                        Printable magic for your little artist.
                    </p>
                </div>
                <Button onClick={handleCreateNewDrawing} size="md" className="shadow-lg shadow-blue-500/20 bg-magic-blue hover:bg-blue-600">
                    New Drawing <i className="fa-solid fa-pen-nib ml-2"></i>
                </Button>
            </div>

            <DashboardSection
                title={t('dash_drawings')}
                icon="fa-palette"
                iconColor="text-magic-blue"
                count={savedImages.length}
                countLabel="coloring"
                badgeColor="text-blue-400"
                dotColor="bg-magic-blue"
                items={savedImages}
                onCreate={handleCreateNewDrawing}
                gridCols="grid-cols-1 lg:grid-cols-3"
                emptyState={{
                    icon: 'fa-paintbrush',
                    message: t('dash_no_drawings'),
                    buttonLabel: t('dash_create_drawing'),
                    buttonIcon: 'fa-wand-magic-sparkles'
                }}
                createCard={{
                    title: t('dash_create_drawing'),
                    subtext: "1 Credit",
                    icon: "fa-plus",
                    theme: "blue"
                }}
                renderItem={(img) => (
                    <ColoringCard
                        key={img.id}
                        image={img}
                        onPrint={(e) => handlePrintDrawing(e, img)}
                        onDelete={(e) => { e.stopPropagation(); deleteImage(img.id); }}
                    />
                )}
            />
        </>
    );
};

export default Coloring;
