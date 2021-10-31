import React from 'react';
import { IS_LOGGED_IN } from "../queries";
import { useApolloClient } from "@apollo/client";

const useSetIsLoggedIn = (data) => {
  const client = useApolloClient();

  client.cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: Boolean(data.token),
    },
  })
}

export { useSetIsLoggedIn };
