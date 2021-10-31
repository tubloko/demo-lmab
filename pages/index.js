import React from 'react';
import { gql } from "@apollo/client";
import { parseCookies } from "../common/helpers/parseCookies";
import createApolloClient from "../apolloClient";
import { useSetIsLoggedIn } from "../common/hooks/useSetIsLoggedIn";

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

const Page = ({ data }) => {
  useSetIsLoggedIn(data);

  return (
    <h1>Page "/"</h1>
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

  try {
    const { token, id } = JSON.parse(data.user);
    const client = createApolloClient(token);
    const { data: { getUser: { user } } } = await client.query({ query: GET_USER, variables: { id } });
    return { props: { data: user } };
  } catch (error) {
    return { props: { data: { errorMessage: error.message } } };
  }
}

export default Page;
