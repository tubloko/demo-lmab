import React from 'react';
import { GET_USER_CLIENT } from "../queries";

const useSetUser = ({ data, client }) => {
  client.cache.writeQuery({
    query: GET_USER_CLIENT,
    data: {
      isLoggedIn: Boolean(data.token),
      nickname: data.nickname,
      userId: data.id,
      challengeRoomsIds: data.challengeRoomsIds,
    },
  })
}

export { useSetUser };
