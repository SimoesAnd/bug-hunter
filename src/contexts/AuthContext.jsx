import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { 
  auth, 
  db, 
  loginWithGoogle, 
  loginWithEmail,  
  registerWithEmail, 
  logoutFirebase, 
  resetPassword 
} from "../firebase"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 AuthProvider: Iniciando...");


    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn("⚠️ Firebase demorou demais. Liberando app...");
        setLoading(false);
      }
    }, 4000);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setUserData(null);
        setLoading(false);
        clearTimeout(safetyTimeout);
        return;
      }

      console.log("👤 Usuário detectado:", firebaseUser.email);

      try {
        const ref = doc(db, "users", firebaseUser.uid);
        // Tenta ler o documento
        const snap = await getDoc(ref);

        if (snap.exists()) {
          console.log("✅ Perfil carregado.");
          setUserData(snap.data());
        } else {
          console.log("📝 Criando perfil inicial...");
          const baseProfile = {
            name: firebaseUser.displayName || "Caçador",
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || null,
            progress: 0,
            achievements: ["first_login"],
            runs: 0
          };
          

          await setDoc(ref, baseProfile).catch(e => console.warn("⚠️ Falha ao salvar no banco (Offline):", e));
          setUserData(baseProfile);
        }
      } catch (error) {
        console.error("❌ Erro no Firestore:", error.message);
        setUserData({
          name: firebaseUser.displayName || "Modo Offline",
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || null,
          progress: 0,
          achievements: [],
          runs: 0
        });
      } finally {
        setLoading(false);
        clearTimeout(safetyTimeout);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        setUserData,
        loading,
        loginGoogle: loginWithGoogle,
        loginEmail: loginWithEmail,
        registerEmail: registerWithEmail,
        logout: logoutFirebase,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}