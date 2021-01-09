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
  font-family: "Lato", sanserif;
  font-size: 16px;

  background-image: url("https://www.toptal.com/designers/subtlepatterns/patterns/texturetastic_gray.png");
  background-color: ${constants.theme.colorA};
  background-blend-mode: hard-light;
}
h1, h2, h3 {
  font-family: "Dancing Script", sanserif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
${constants.devices.laptop}{
  html, body {font-size: 18px;}
}
`;

export const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <React.Fragment>
      <UserProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href={`https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lato&display=swap`}
            rel="stylesheet"
          />
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
