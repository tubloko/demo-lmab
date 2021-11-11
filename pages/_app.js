import React, { useMemo } from 'react';
import App from 'next/app'
import Head from 'next/head';
import { ApolloProvider, gql } from "@apollo/client";
import { CookiesProvider, useCookies } from "react-cookie";
import createApolloClient from '../apolloClient';
import { createGlobalStyle } from 'styled-components';
import Layout from "../components/Layout";
import 'bootswatch/dist/lux/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { parseCookies } from "../common/helpers/parseCookies";
import { useSetUser } from "../common/hooks/useSetUser";
import { GET_USER } from "../common/queries";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

export default function MyApp({ Component, pageProps, data }) {
  const [cookies] = useCookies(['user']);
  const client = useMemo(() => createApolloClient(cookies?.user?.token), []);
  useSetUser({ data, client });

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </CookiesProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const data = parseCookies(appContext.ctx.req);

  try {
    const { token, id } = JSON.parse(data.user);
    const client = createApolloClient(token);
    const { data: { getUser: { user } } } = await client.query({ query: GET_USER, variables: { id } });
    return { ...appProps, data: user };
  } catch (error) {
    return { ...appProps, data: { errorMessage: error.message } };
  }
}
