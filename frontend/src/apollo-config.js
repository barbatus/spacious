import { InMemoryCache, ApolloClient, ApolloLink, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();

const authLink = setContext((request, previousContext) => ({
  headers: { authorization: 'Bearer strapiBearerToken' }
}));

const httpLink = createHttpLink({
  uri: `//localhost:8000/graphql`,
});
const link = ApolloLink.from([authLink, httpLink]);

export const client = new ApolloClient({
  cache,
  link,
});
