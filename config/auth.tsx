import firebase from 'firebase/app';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';

import { auth } from './firebase';
import { generateUserDocument, User } from './users';

const provider = new firebase.auth.GoogleAuthProvider();

interface UserContextProps {
  user: User | null;
}

const tokenName = 'firebaseToken';

export const UserContext = React.createContext<UserContextProps>({ user: null });

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const { pathname, events } = useRouter();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const token = await authUser.getIdToken();
        cookie.set(tokenName, token, { expires: 14 });
        setUser(await generateUserDocument(authUser));
      } else {
        cookie.remove(tokenName);
      }
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = (url) => {
      if (url !== '/' && !user) {
        window.location.href = '/';
      }
    };
    // Check that initial route is OK
    if (pathname !== '/' && user === null) {
      window.location.href = '/';
    }
    // Monitor routes
    events.on('routeChangeStart', handleRouteChange);
    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [user]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useAuth = (): UserContextProps => React.useContext(UserContext);

export const loginWithGoogle = async (): Promise<void> => {
  await auth.signInWithPopup(provider);
};

export const logout = async (): Promise<void> => {
  await auth.signOut();
};
