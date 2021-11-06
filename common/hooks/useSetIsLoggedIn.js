import React from 'react';
import { IS_LOGGED_IN } from "../queries";

const useSetIsLoggedIn = ({ data, client }) => {
  client.cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: Boolean(data.token),
    },
  })
}

export { useSetIsLoggedIn };
