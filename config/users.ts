import firebase from 'firebase/app';

import { getDB } from './firebase';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export const generateUserDocument = async (
  user: firebase.User,
  additionalData = {}
): Promise<User> => {
  if (!user) return;
  const userRef = (await getDB()).doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid: string): Promise<User> => {
  if (!uid) return null;
  try {
    const userDocument = (await (await getDB()).doc(`users/${uid}`).get()).data() as User;
    return {
      uid,
      ...userDocument
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
