import React, { useMemo } from 'react';
import Head from 'next/head';
import  { ApolloProvider } from "@apollo/client";
import { CookiesProvider, useCookies } from "react-cookie";
import createApolloClient from '../apolloClient';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

export default function MyApp({ Component, pageProps }) {
  const [cookies] = useCookies(['user']);
  const client = useMemo(() => createApolloClient(cookies?.user?.token), []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>lmab</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <GlobalStyle />
      <CookiesProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </CookiesProvider>
    </>
  )
}
