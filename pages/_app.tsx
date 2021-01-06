import { AppProps } from 'next/app';
import Head from 'next/head';
import cookies from 'next-cookies';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { UserProvider } from '@/config/auth';
import constants from '@/config/constants';

export const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 16px;

  background-color: #d9f099;
  background-image: url("https://www.transparenttextures.com/patterns/arches.png");
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;

export const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <React.Fragment>
      <UserProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </UserProvider>
    </React.Fragment>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const { firebaseToken } = cookies(ctx);
  console.log(!firebaseToken, ctx.req?.url);
  if (!firebaseToken && ctx.res && constants.nav.map((path) => path.path).includes(ctx.req?.url)) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }
  return {};
};

export default App;
