"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../types";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  children,
  serverUser,
}: {
  children: React.ReactNode;
  serverUser: any; // from getUserServer()
}) {
  const [user, setUser] = useState<UserProfile | null>(serverUser || null);
  const [loading, setLoading] = useState(false);

  /**
   * 🔄 Refresh user data from Firestore (coins, plan, etc.)
   */
  const refreshUser = async () => {
    if (!serverUser) return;

    try {
      setLoading(true);

      const res = await fetch("/api/user/me");
      const data = await res.json();

      setUser((prev) => ({
        ...prev,
        ...data,
      }));
    } catch (err) {
      console.error("Failed to refresh user", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🚪 Logout (clears session cookie server-side)
   */
  const logout = async () => {
    try {
      await fetch("/api/firebase/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // No onAuthStateChanged — dashboard uses SERVER cookies only

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
