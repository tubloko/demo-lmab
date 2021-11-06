import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { MAIN_API } from "./common/constants/apiURLs";
import { SubscriptionClient } from 'subscriptions-transport-ws';

const createApolloClient = (token = '') => {
  const ssrMode = (typeof window === 'undefined');
  let link;

  if (ssrMode) {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        }
      }
    });
    link = authLink.concat(createHttpLink({
      uri: `${MAIN_API}/graphql`,
    }));
  } else {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        }
      }
    });
    const httpLink = authLink.concat(createHttpLink({
      uri: `${MAIN_API}/graphql`,
    }));
    const client = new SubscriptionClient(
      `ws://localhost:4000/graphql`, {
        reconnect: true,
        connectionParams: {
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        }
      }
    );
    const wsLink = new WebSocketLink(client);
    link = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink
      );
  }

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    ssrMode,
  });
}

export default createApolloClient;
