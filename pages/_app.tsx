import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { UserProvider } from '@/config/auth';
import constants from '@/config/constants';
import { MessageProvider } from '@/config/messages';

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
        <MessageProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href={`https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lato&display=swap`}
              rel="stylesheet"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <title>TejoVarsh</title>
            <meta name="Description" content="Tejovanth Weds Varsha" />
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </MessageProvider>
      </UserProvider>
    </React.Fragment>
  );
};

export default App;
