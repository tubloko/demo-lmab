import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { useGoogleLogin } from 'react-google-login';
import {useMutation, gql, useApolloClient} from "@apollo/client";
import * as qs from 'qs';
import { parseCookies } from "../common/helpers/parseCookies";
import createApolloClient from "../apolloClient";
import { Layout } from "../components";
import { IS_LOGGED_IN } from "../common/queries";
import { REDIRECT_URL } from "../common/constants/apiURLs";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      user {
        email
        nickname
        firstName
        lastName
        token
        id
      }
    }
  }
`;

const SIGN_IN_WITH_GOOGLE = gql`
  mutation SignInWithGoogle($accessToken: String!) {
    signInWithGoogle(accessToken: $accessToken) {
      user {
        email
        googleId
        nickname
        firstName
        lastName
      } 
    }
  }
`;

const Page = ({ data }) => {
  const client = useApolloClient();
  const router = useRouter();
  const [signInWithGoogle, { error }] = useMutation(SIGN_IN_WITH_GOOGLE, {
    onCompleted: ({ signInWithGoogle: { user: { email, googleId, nickname, firstName, lastName } } }) => {
      router.push( {
        pathname: 'auth/register',
        query: qs.stringify({
          email,
          googleId,
          nickname,
          firstName,
          lastName,
        }),
      });
    }
  });
  const { signIn } = useGoogleLogin({
    onSuccess: ({ tokenId, googleId }) => signInWithGoogle({ variables: { accessToken: tokenId, googleId } }),
    clientId: '1058652577809-befvkbiblen37vfvvdvf11c4pks8dnuq.apps.googleusercontent.com',
    redirectUri: REDIRECT_URL,
    onFailure: () => console.log('fail'),
  });

  useEffect(() => {
    client.cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: Boolean(data.token),
      },
    })
  }, []);

  if (error) return <p>something went wrong {error.message}</p>;
  if (data.error) return <p>{data.errorMessage}</p>;

  return (
    <Layout>
      <Link href={'/profile'}>Profile</Link>
      <div>
        <button onClick={signIn}>sign in with google</button>
      </div>
      <div>
        <button onClick={() => router.push('auth/register')}>sign in</button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  const { token, id } = JSON.parse(data.user);
  const client = createApolloClient(token);
  try {
    const { data: { getUser: { user } } } = await client.query({ query: GET_USER, variables: { id } });
    return { props: { data: user } };
  } catch (error) {
    return { props: { data: { error, errorMessage: error.message } } };
  }
}

export default Page;
