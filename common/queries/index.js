import { gql } from "@apollo/client";

export const GET_USER_CLIENT = gql`
  query GetUserClient {
    isLoggedIn @client
    nickname @client
    userId @client
    challengeRoomsIds @client
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
        challengeRoomsIds
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

export const ON_SUBSCRIBE_TO_CHALLENGE = gql`
  mutation OnSubscribe($challengeRoomId: String! $challengeRoomIds: [String] $id: ID!) {
    onSubscribe(challengeRoomId: $challengeRoomId challengeRoomIds: $challengeRoomIds id: $id) {
      user {
        id
        challengeRoomsIds
      }
    }
  }
`;
