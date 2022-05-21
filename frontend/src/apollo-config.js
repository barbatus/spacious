import { InMemoryCache, ApolloClient, ApolloLink, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: `//localhost:8000/graphql`,
});
const link = ApolloLink.from([httpLink]);

export const client = new ApolloClient({
  cache,
  link,
});
