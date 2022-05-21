import express from 'express';

import { ApolloServer } from 'apollo-server-express';

import { createServer } from 'http';

import { typeDefs, resolvers } from './api/schema';

const PORT = process.env.PORT || 8000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: 'http://localhost:8000/graphql',
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

const httpServer = createServer(app);

httpServer.listen(PORT);
