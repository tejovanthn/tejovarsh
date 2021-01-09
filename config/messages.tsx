import firebase from 'firebase/app';
import React from 'react';

import { getDB } from './firebase';
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
  const messageRef = (await getDB()).collection('messages').doc();
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
    const snapshot = await (await getDB()).collection('messages').get();
    snapshot.forEach((doc) => messages.push({ id: doc.id, ...(doc.data() as Message) }));
    return messages.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
  } catch (error) {
    console.error('Error fetching messages', error);
  }
};

interface MessageContextProps {
  messages: Message[];
}

export const MessageContext = React.createContext<MessageContextProps>({ messages: [] });

export const MessageProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    let unsubscribe: firebase.Unsubscribe;
    getDB().then((database) => {
      unsubscribe = database
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const allmessages = [];
          snapshot.forEach((doc) => {
            if (!doc.metadata.hasPendingWrites) {
              allmessages.push({ ...doc.data(), id: doc.id });
            }
          });
          setMessages(allmessages);
        });
    });
    return () => unsubscribe();
  }, []);

  return <MessageContext.Provider value={{ messages }}>{children}</MessageContext.Provider>;
};

export const useMessages = (): MessageContextProps => React.useContext(MessageContext);
