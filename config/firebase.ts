import 'firebase/auth';

import firebase from 'firebase/app';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();

const getAuth = async (): Promise<firebase.auth.Auth> => {
  if (!firebase.auth) {
    await import('firebase/auth');
  }
  return firebase.auth();
};
const getDB = async (): Promise<firebase.firestore.Firestore> => {
  if (!firebase.firestore) {
    await import('firebase/firestore');
  }

  return firebase.firestore();
};

export { getAuth, getDB };

console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
