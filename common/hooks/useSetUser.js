import React from 'react';
import { IS_LOGGED_IN } from "../queries";

const useSetUser = ({ data, client }) => {
  client.cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: Boolean(data.token),
      nickname: data.nickname,
      userId: data.id
    },
  })
}

export { useSetUser };
