import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_USER = gql`
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

export const GET_CHALLENGE_ROOMS_LIST = gql`
  query ListChallenges {
    listChallengeRooms {
      description
      title
      author
      id
      userId
    }
  }
`;
