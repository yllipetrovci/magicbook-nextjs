export function sanitizeFirestore(data: any) {
    if (!data || typeof data !== "object") return data;

    const clean = JSON.parse(JSON.stringify(data, (_, value) => {
        // Firestore Timestamp → convert to ISO string
        if (value && value._seconds !== undefined && value._nanoseconds !== undefined) {
            return new Date(value._seconds * 1000).toISOString();
        }
        return value;
    }));

    return clean;
}
