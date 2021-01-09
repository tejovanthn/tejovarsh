import firebase from 'firebase';

import { db } from './firebase';
import { User } from './users';

export type Timestamp = firebase.firestore.Timestamp;

export interface Message {
  id: string;
  user: Pick<User, 'displayName' | 'photoURL' | 'uid'>;
  createdAt: Timestamp;
  text: string;
}

export const createMessage = async (
  user: Message['user'],
  text: Message['text']
): Promise<void> => {
  if (!user || !text) return;
  const messageRef = db.collection('messages').doc();
  try {
    return messageRef.set({
      user: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      },
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as Timestamp
    });
  } catch (error) {
    console.log('Error creating message', error);
  }
};

export const getAllMessages = async (): Promise<Message[]> => {
  try {
    const messages: Message[] = [];
    const snapshot = await db.collection('messages').get();
    snapshot.forEach((doc) => messages.push({ id: doc.id, ...(doc.data() as Message) }));
    return messages.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
  } catch (error) {
    console.error('Error fetching messages', error);
  }
};
