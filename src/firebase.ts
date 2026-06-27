import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const metaEnv = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || "AIzaSyBhhN-BkD3SeiwwRNS8E9PXEsB1YICK2s8",
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || "gen-lang-client-0755965177.firebaseapp.com",
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || "gen-lang-client-0755965177",
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || "gen-lang-client-0755965177.firebasestorage.app",
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || "504849688518",
  appId: metaEnv.VITE_FIREBASE_APP_ID || "1:504849688518:web:9821f08a2e6c195b6bf4c7"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore with custom database ID
const db = initializeFirestore(app, {
  databaseId: metaEnv.VITE_FIREBASE_DATABASE_ID || "ai-studio-topssyfoodies-949bde9c-dda6-4cff-8074-c17520df0286"
} as any);

export { app, auth, db };
