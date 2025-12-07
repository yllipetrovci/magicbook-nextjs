export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function cleanBase64(dataUrl: string): string {
    return dataUrl.replace(/^data:(image\/\w+);base64,/, "");
}
