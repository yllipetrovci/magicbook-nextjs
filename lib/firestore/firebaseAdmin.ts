import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

if (!admin.apps.length) {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

    console.log({ serviceAccountPath });
    if (!serviceAccountPath) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH is not set");
    }

    const serviceAccount = JSON.parse(
        readFileSync(path.resolve(serviceAccountPath), "utf8")
    );


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.PRIVATE_FIREBASE_STORAGE_BUCKET,
        databaseURL: process.env.PRIVATE_FIREBASE_DATABASE_URL,
    });
    // ✅ NOW it's safe
    console.log("ADMIN project:", admin.app()); // ✅ defined

}

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();
export const adminStorage = admin.storage();
