import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 AuthProvider mount - setting up auth listener");
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔄 onAuthStateChanged:", currentUser ? `✓ ${currentUser.email}` : "✗ (logged out)");
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log("🔐 Starting signInWithPopup...");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✓ signInWithPopup succeeded:", result.user.email);
      setUser(result.user);
    } catch (error: any) {
      console.error("❌ Sign in failed:", error?.code, error?.message);

      if (error?.code === "auth/unauthorized-domain") {
        const currentDomain = window.location.hostname;
        alert(
          `Dominio nao autorizado no Firebase Auth: ${currentDomain}.\n\n` +
            "No Firebase Console, adicione este dominio em Authentication > Settings > Authorized domains."
        );
        return;
      }

      if (error?.code === "auth/popup-blocked") {
        alert("Popup foi bloqueado. Verifique as configurações de pop-ups do navegador.");
        return;
      }

      if (error?.code !== "auth/popup-closed-by-user") {
        alert("Falha ao autenticar com Google. Verifique as configuracoes do Firebase Auth.");
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
