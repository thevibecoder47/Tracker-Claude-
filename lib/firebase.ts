// SETUP INSTRUCTIONS (do these manually before running the app):
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it "gate-tracker-2027"
// 3. Disable Google Analytics (optional) → Create project
// 4. Click "Web" icon (</>) → Register app → name "gate-tracker-web"
// 5. Copy the firebaseConfig object shown — paste into .env.local
// 6. In Firebase Console → Authentication → Get Started
//    → Sign-in method → Google → Enable → Save
// 7. In Firebase Console → Firestore Database → Create database
//    → Start in test mode → Choose region (asia-south1 for India) → Done
// 8. In Firebase Console → Firestore → Rules → Paste the rules from firestore.rules

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
