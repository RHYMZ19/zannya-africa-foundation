// src/products/context/AuthContext.tsx
"use client";

import { createContext, useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export interface AppUser {
  uid: string;
  email: string | null;
  role: "admin" | "user";
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        console.log("Auth: no user");
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("Auth: firebaseUser found", firebaseUser.uid);

      const snap = await getDoc(doc(db, "users", firebaseUser.uid));

      const role = snap.exists() ? snap.data()?.role || "user" : "user";

      const appUser: AppUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role,
      };

      console.log("Auth: setting user", appUser);
      setUser(appUser);
      setLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
