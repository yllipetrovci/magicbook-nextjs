import {
    collection,
    getDocs,
    query,
    where,
    doc,
    setDoc,
    addDoc,
    FieldValue,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { clientAuth, clientFirestore, clientStorage } from "../lib/firestore/firebaseClient";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
} from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

const generateRandomString = (length = 12) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
};

interface UserData {
    userId: string;
    coins: number;
    updatedAt: Date;
}

interface SetUserDataParams {
    coins: number;
}

interface PromoCodeData {
    code: string;
    isValid: boolean;
    discount?: number;
    [key: string]: any;
}

class FirebaseService {
    // 🧠 Create or update user data
    setUserData = async (data: SetUserDataParams) => {
        if (!clientAuth) throw new Error("Firebase Auth not initialized");

        const user = clientAuth.currentUser;
        if (!user) throw new Error("User not logged in");

        if (!clientFirestore) throw new Error("Firestore not initialized");

        const userRef = doc(clientFirestore, "userData", user.uid);

        const userData = await this.getUserData();

        await setDoc(
            userRef,
            {
                userId: user.uid,
                coins: userData !== null ? userData.coins + data.coins : data.coins,
                updatedAt: new Date(),
            },
            { merge: true }
        );

        console.log("✅ User data saved successfully!");
    };

    getUserData = async (): Promise<(UserData & { id: string }) | null> => {
        if (!clientAuth) throw new Error("Firebase Auth not initialized");

        const user = clientAuth.currentUser;
        if (!user) throw new Error("User not logged in");

        if (!clientFirestore) throw new Error("Firestore not initialized");

        const q = query(
            collection(clientFirestore, "userData"),
            where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;

        const docData = querySnapshot.docs[0];
        return { id: docData.id, ...docData.data() } as UserData & { id: string };
    };

    collectEmail = async (email: string) => {
        if (!email || !email.includes("@")) throw new Error("Invalid email");

        if (!clientFirestore) throw new Error("Firestore not initialized");

        await addDoc(collection(clientFirestore, "collectionEmails"), {
            email,
            createdAt: serverTimestamp()
        });

        console.log(`📧 Email "${email}" saved to collectionEmails!`);
    };

    checkPromoCode = async (code: string): Promise<PromoCodeData> => {
        if (!clientFirestore) throw new Error("Firestore not initialized");

        const promoRef = collection(clientFirestore, "promocodes");
        const q = query(promoRef, where("code", "==", code));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) throw new Error("Promo not found");

        const promoData = querySnapshot.docs[0].data() as PromoCodeData;
        if (!promoData.isValid) throw new Error("Promo code is invalid or expired");

        console.log("✅ Promo code valid:", promoData);
        return promoData;
    };

    uploadPhoto = async (file: File): Promise<string> => {
        if (!clientAuth) throw new Error("Firebase Auth not initialized");
        if (!clientStorage) throw new Error("Firebase Storage not initialized");

        const user = clientAuth.currentUser;
        if (!user) throw new Error("User not logged in");
        if (!file) throw new Error("No file provided");

        // Unique path per user + filename
        const fileRef = ref(clientStorage, `userPhotos/${user.uid}/${file.name}`);

        // Upload the file
        const snapshot = await uploadBytes(fileRef, file);

        // Get the public URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("✅ File uploaded. URL:", downloadURL);
        return downloadURL;
    };

    createUser = async (email: string, password: string) => {
        if (!clientAuth) throw new Error("Firebase Auth not initialized");

        try {
            const userCredential = await createUserWithEmailAndPassword(
                clientAuth,
                email,
                password
            );

            console.log("✅ User created and signed in:", email);
            return userCredential;
        } catch (error: any) {
            console.error("❌ Error creating user:", error);

            // Handle common Firebase errors
            if (error.code === "auth/email-already-in-use") {
                throw new Error("This email is already registered. Please sign in instead.");
            } else if (error.code === "auth/invalid-email") {
                throw new Error("Invalid email address.");
            } else if (error.code === "auth/weak-password") {
                throw new Error("Password is too weak. Please use a stronger password.");
            }

            throw error;
        }
    };

    signIn = async (email: string, password: string) => {
        if (!clientAuth) throw new Error("Firebase Auth not initialized");

        try {
            const userCredential = await signInWithEmailAndPassword(
                clientAuth,
                email,
                password
            );

            console.log("✅ User signed in:", email);
            return userCredential;
        } catch (error: any) {
            console.error("❌ Error signing in:", error);

            // Handle common Firebase errors
            if (error.code === "auth/user-not-found") {
                throw new Error("No account found with this email. Please sign up first.");
            } else if (error.code === "auth/wrong-password") {
                throw new Error("Incorrect password. Please try again.");
            } else if (error.code === "auth/invalid-email") {
                throw new Error("Invalid email address.");
            } else if (error.code === "auth/user-disabled") {
                throw new Error("This account has been disabled.");
            }

            throw error;
        }
    };

    handleForgotPassword = async (email: string) => {
        if (!email) {
            throw new Error("Please enter your email first.");
        }

        if (!clientAuth) throw new Error("Firebase Auth not initialized");

        try {
            await sendPasswordResetEmail(clientAuth, email);
            console.log("📨 Password reset email sent! Check your inbox.");
        } catch (error: any) {
            console.error("Error sending reset email:", error.message);
            throw error;
        }
    };

    handleResetPassword = async (newPassword: string) => {
        if (!clientAuth) throw new Error("Firebase Auth not initialized");

        const user = clientAuth.currentUser;

        if (!user) {
            throw new Error("No user is currently logged in.");
        }

        try {
            return await updatePassword(user, newPassword);
        } catch (error: any) {
            console.error("❌ Error updating password:", error);
            if (error.code === "auth/requires-recent-login") {
                throw new Error("You need to re-login before changing your password.");
            }
            throw error;
        }
    };
}

export const firebaseService = new FirebaseService();
