import firebase from 'firebase/app';
import cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import cookies from 'next-cookies';
import React from 'react';

import constants from './constants';
import { getAuth } from './firebase';
import { generateUserDocument, User } from './users';

const provider = new firebase.auth.GoogleAuthProvider();
interface UserContextProps {
  user: User | null;
}

const tokenName = 'firebaseToken';

export const UserContext = React.createContext<UserContextProps>({ user: null });

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let unsubscribe: firebase.Unsubscribe;
    getAuth().then((auth) => {
      unsubscribe = auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          const token = await authUser.getIdToken();
          cookie.set(tokenName, token, { expires: 14 });
          setUser(await generateUserDocument(authUser));
        } else {
          cookie.remove(tokenName);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useAuth = (): UserContextProps => React.useContext(UserContext);

export const loginWithGoogle = async (): Promise<void> => {
  await (await getAuth()).signInWithPopup(provider);
};

export const logout = async (): Promise<void> => {
  await (await getAuth()).signOut();
};

export const authSSR: GetServerSideProps = async (ctx) => {
  const { firebaseToken } = cookies(ctx);
  if (!firebaseToken && ctx.res && constants.nav.map((path) => path.path).includes(ctx.req?.url)) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return {
      props: {}
    };
  }
  return { props: {} };
};
