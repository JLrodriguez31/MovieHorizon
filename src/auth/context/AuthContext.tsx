import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContextBase";

const GUEST_SESSION_KEY = "movieapp_guest_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(GUEST_SESSION_KEY) === "true";
  });
  const [loading, setLoading] = useState(!isGuest);

  const enterAsGuest = () => {
    setIsGuest(true);
    setLoading(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(GUEST_SESSION_KEY, "true");
    }
  };

  const clearGuest = () => {
    setIsGuest(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(GUEST_SESSION_KEY);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsGuest(false);
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(GUEST_SESSION_KEY);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, enterAsGuest, clearGuest }}>
      {children}
    </AuthContext.Provider>
  );
}