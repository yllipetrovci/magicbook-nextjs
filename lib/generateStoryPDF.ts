import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { GeneratedStory } from "@/app/types";

// Helper to get high-res image or fallback
const getIllustrationUrl = (page: { image?: string, imageDescription?: string }, seed: string) => {
    if (page.image) return page.image;
    // We use a high-res placeholder if no image exists yet
    return `https://picsum.photos/seed/${seed}/1200/800`;
};

// SVG Noise Filter (same as BookReader)
const NOISE_OVERLAY = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`;

export const generateStoryPDF = async (story: GeneratedStory): Promise<void> => {
    // 1. Create a hidden container to render pages
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-10000px';
    container.style.left = '-10000px';
    container.style.width = '1123px'; // A4 Landscape width approx (96 DPI)
    // container.style.height = '794px'; // A4 Landscape height approx
    document.body.appendChild(container);

    // 2. Initialize jsPDF (Landscape A4)
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    const pdfWidth = 297;
    const pdfHeight = 210;

    // Helper to render a generic page into the container
    const renderPageToCanvas = async (htmlContent: string): Promise<HTMLCanvasElement> => {
        container.innerHTML = htmlContent;
        // Wait briefly for images to potentially load if they aren't cached, 
        // though html2canvas handles most of this with useCORS.

        return await html2canvas(container.firstElementChild as HTMLElement, {
            scale: 2, // High res
            useCORS: true, // Critical for external images
            logging: false
        });
    };

    try {
        // --- COVER PAGE ---
        const coverUrl = story.coverImage || `https://picsum.photos/seed/${story.title}/1200/800`;
        const coverHTML = `
            <div style="width: 1123px; height: 794px; position: relative; display: flex; overflow: hidden; font-family: 'serif';">
                <!-- Front Cover (Right Half) -->
                <div style="width: 50%; height: 100%; position: absolute; right: 0; top: 0; background-color: #1e293b; overflow: hidden;">
                    <img src="${coverUrl}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;" />
                    <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent, rgba(0,0,0,0.8));"></div>
                    <div style="position: absolute; top: 20%; left: 0; width: 100%; text-align: center; padding: 0 40px;">
                        <div style="background-color: rgba(11, 12, 21, 0.9); padding: 30px; border-radius: 20px; border: 4px solid #FF9F1C; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <h1 style="font-size: 48px; color: #FF9F1C; margin: 0; line-height: 1.2; font-family: 'Cinzel', serif;">${story.title}</h1>
                        </div>
                    </div>
                    <div style="position: absolute; bottom: 10%; width: 100%; text-align: center;">
                         <div style="background-color: rgba(0,0,0,0.5); display: inline-block; padding: 10px 30px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.2);">
                            <p style="color: white; font-size: 24px; margin: 0;">Written for ${story.heroName || "The Hero"}</p>
                         </div>
                    </div>
                </div>
                <!-- Back Cover (Left Half) -->
                <div style="width: 50%; height: 100%; background-color: #2C1A18; position: absolute; left: 0; top: 0; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center; opacity: 0.5;">
                         <h2 style="color: #FF9F1C; font-size: 40px; margin-bottom: 20px;">AI Magic Book</h2>
                         <p style="color: white;">Created with Magic</p>
                    </div>
                </div>
                <!-- Spine Shadow -->
                <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 40px; background: linear-gradient(to right, rgba(0,0,0,0.5), transparent); transform: translateX(-50%); z-index: 10;"></div>
            </div>
        `;

        const coverCanvas = await renderPageToCanvas(coverHTML);
        pdf.addImage(coverCanvas.toDataURL('image/jpeg', 0.8), 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // --- TITLE PAGE SPREAD ---
        pdf.addPage();
        const titleHTML = `
            <div style="width: 1123px; height: 794px; display: flex; font-family: 'serif'; background-color: #fdf6e3;">
                <!-- Left: Title Info -->
                <div style="width: 50%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; box-sizing: border-box; background-color: #fff7ed; position: relative;">
                    <h1 style="font-size: 50px; color: #1f2937; text-align: center; font-family: 'Cinzel', serif; margin-bottom: 20px;">${story.title}</h1>
                    <div style="width: 100px; height: 4px; background-color: #ddd; margin: 20px auto;"></div>
                    <p style="font-size: 24px; color: #666; font-style: italic;">A magical tale for</p>
                    <p style="font-size: 36px; color: #F97316; font-weight: bold;">${story.heroName}</p>
                    <p style="position: absolute; bottom: 40px; font-size: 14px; color: #999;">Ex Libris • AI Magic Book</p>
                </div>
                <!-- Right: First Page Image (or decorative) -->
                 <div style="width: 50%; height: 100%; overflow: hidden; background-color: white;">
                    <img src="${getIllustrationUrl(story.pages[0], story.title + "0")}" style="width: 100%; height: 100%; object-fit: cover;" />
                 </div>
                 <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background-color: rgba(0,0,0,0.1);"></div>
            </div>
        `;
        const titleCanvas = await renderPageToCanvas(titleHTML);
        pdf.addImage(titleCanvas.toDataURL('image/jpeg', 0.8), 'JPEG', 0, 0, pdfWidth, pdfHeight);


        // --- STORY PAGES ---
        // Render in pairs (Spreads)
        // Since we already used Page 0 image on title spread right side, let's restart standard flow.
        // Actually, standard book:
        // Spread 1: Left (Copyright/Dedication), Right (Title Page) - Simplified above to Left Title/Right Image 1
        // Let's do:
        // Spread X: Left (Text Page N), Right (Image Page N+1) - Wait, standard picture books usually have text and image for the SAME scene visible at once.
        // Our data model: Page { text, image }.
        // So Spread X: Left (Text), Right (Image) corresponding to same scene.

        for (let i = 0; i < story.pages.length; i++) {
            pdf.addPage();
            const page = story.pages[i];
            const imgUrl = getIllustrationUrl(page, story.title + i);

            const spreadHTML = `
                <div style="width: 1123px; height: 794px; display: flex; font-family: 'Libre Baskerville', serif;">
                    <!-- Left: Text -->
                    <div style="width: 50%; height: 100%; padding: 60px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; position: relative; background-color: #fdf6e3;">
                         <!-- Paper Texture Simulation -->
                         <div style="position: absolute; inset: 0; opacity: 0.1; background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png'); mix-blend-mode: multiply;"></div>
                         
                         <p style="text-align: center; color: #9CA3AF; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 40px;">Page ${i + 1}</p>
                         
                         <p style="font-size: 28px; line-height: 2; color: #1F2937; text-align: left;">
                            <span style="font-size: 60px; color: #F97316; float: left; margin-right: 10px; line-height: 0.8; font-family: 'Cinzel', serif;">${page.text.charAt(0)}</span>
                            ${page.text.slice(1)}
                         </p>

                         <div style="margin-top: auto; text-align: center; color: #A78BFA; opacity: 0.3; font-size: 30px;">❦</div>
                    </div>
                    <!-- Right: Image -->
                    <div style="width: 50%; height: 100%; background-color: #fff; overflow: hidden; position: relative;">
                         <img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
                         <!-- Inner Shadow for depth -->
                         <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 20px; background: linear-gradient(to right, rgba(0,0,0,0.2), transparent);"></div>
                    </div>
                </div>
            `;

            const canvas = await renderPageToCanvas(spreadHTML);
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.8), 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }

        // --- END PAGE ---
        pdf.addPage();
        const endHTML = `
            <div style="width: 1123px; height: 794px; display: flex; align-items: center; justify-content: center; background-color: #0B0C15; color: white; font-family: 'Cinzel', serif;">
                <div style="text-align: center;">
                    <h1 style="font-size: 80px; margin-bottom: 20px;">The End</h1>
                    <p style="font-family: 'sans-serif'; color: #666;">Generated by AI Magic Book</p>
                </div>
            </div>
        `;
        const endCanvas = await renderPageToCanvas(endHTML);
        pdf.addImage(endCanvas.toDataURL('image/jpeg', 0.8), 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Save
        pdf.save(`${story.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);

    } catch (e) {
        console.error("PDF Generation Error", e);
        throw e;
    } finally {
        // Cleanup
        document.body.removeChild(container);
    }
};