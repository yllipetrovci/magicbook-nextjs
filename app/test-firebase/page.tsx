"use client";

import { useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { clientAuth } from "@/lib/firestore/firebaseClient";
import { signUpWithEmail, signInWithEmail, logOut } from "@/lib/auth";

export default function FirebaseTest() {
    const [status, setStatus] = useState("Idle");
    const [uid, setUid] = useState("");
    const [serverUid, setServerUid] = useState("");

    // Email/Password State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authMessage, setAuthMessage] = useState("");

    const runAnonymousTest = async () => {
        setStatus("Testing...");
        try {
            if (!clientAuth) {
                throw new Error("Firebase client not initialized. Check .env.local config.");
            }

            // 1. Client-side Auth
            const userCredential = await signInAnonymously(clientAuth);
            const user = userCredential.user;
            setUid(user.uid);

            // 2. Get ID Token
            const idToken = await user.getIdToken();

            // 3. Server-side Verification
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            if (!res.ok) throw new Error("Server verification failed");

            const data = await res.json();
            setServerUid(data.uid);
            setStatus("Success! Client and Server UIDs match.");
        } catch (error: any) {
            console.error(error);
            setStatus(`Error: ${error.message}`);
        }
    };

    const handleSignUp = async () => {
        try {
            setAuthMessage("Signing up...");
            const cred = await signUpWithEmail(email, password);
            setAuthMessage(`Signed up as: ${cred.user.email} (${cred.user.uid})`);
            setUid(cred.user.uid);
        } catch (e: any) {
            setAuthMessage(`Sign up error: ${e.message}`);
        }
    };

    const handleSignIn = async () => {
        try {
            setAuthMessage("Signing in...");
            const cred = await signInWithEmail(email, password);
            setAuthMessage(`Signed in as: ${cred.user.email} (${cred.user.uid})`);
            setUid(cred.user.uid);
        } catch (e: any) {
            setAuthMessage(`Sign in error: ${e.message}`);
        }
    };

    const handleLogOut = async () => {
        try {
            await logOut();
            setAuthMessage("Logged out");
            setUid("");
            setServerUid("");
            setStatus("Idle");
        } catch (e: any) {
            setAuthMessage(`Logout error: ${e.message}`);
        }
    };

    const handleCreateUserRecord = async () => {
        try {
            if (!clientAuth?.currentUser) {
                throw new Error("No user logged in");
            }

            setAuthMessage("Creating user record...");
            const idToken = await clientAuth.currentUser.getIdToken();

            const res = await fetch("/api/users/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    idToken,
                    data: { role: "tester", lastLogin: new Date().toISOString() }
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            setAuthMessage(`Record created! UID: ${result.uid}`);
        } catch (e: any) {
            setAuthMessage(`Create record error: ${e.message}`);
        }
    };

    return (
        <div className="p-8 font-sans max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Firebase Integration Test</h1>

            {/* Anonymous Auth Section */}
            <section className="mb-12 p-6 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">1. Anonymous Auth & Server Verification</h2>
                <button
                    onClick={runAnonymousTest}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Run Anonymous Test
                </button>
                <div className="mt-4 space-y-1 text-sm">
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Client UID:</strong> {uid}</p>
                    <p><strong>Server UID:</strong> {serverUid}</p>
                </div>
            </section>

            {/* Email/Password Auth Section */}
            <section className="p-6 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">2. Email/Password Auth</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <button
                            onClick={handleSignUp}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={handleSignIn}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={handleLogOut}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Log Out
                        </button>
                        <button
                            onClick={handleCreateUserRecord}
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                            Create DB Record
                        </button>
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-700">
                        {authMessage}
                    </p>
                </div>
            </section>
        </div>
    );
}
