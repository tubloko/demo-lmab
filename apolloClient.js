import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MAIN_API } from "./common/constants/apiURLs";

const createApolloClient = (token = '') => {
  const httpLink = createHttpLink({
    uri: `${MAIN_API}/graphql`,
  });
  const authLink = setContext((_, { headers }) => {

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });
}

export default createApolloClient;
