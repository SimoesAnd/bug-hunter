import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxYizjfuBPLwb_fDhCK3P_f6ynuL43a8A",
  authDomain: "bug-hunter-61411.firebaseapp.com",
  projectId: "bug-hunter-61411",
  storageBucket: "bug-hunter-61411.firebasestorage.app",
  messagingSenderId: "159678276834",
  appId: "1:159678276834:web:6e3aee5acaac2240b9aabb",
  measurementId: "G-WQ5R0GX4DR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// --- FUNÇÕES AUXILIARES ---

export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Cria Auth + Documento no Firestore
export async function registerWithEmail(name, email, password) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  await updateProfile(user, { displayName: name });

  // Cria perfil inicial no banco
  await setDoc(doc(db, "users", user.uid), {
    name: name,
    email: email,
    photoURL: "",
    progress: 0,
    runs: 0,
    achievements: ["first_login"]
  });

  return user;
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  // O AuthContext vai verificar se o doc existe e criar se necessário
  return result.user;
}

export function logoutFirebase() {
  return signOut(auth);
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}