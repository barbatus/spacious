import Koa from 'koa';

import { ApolloServer } from 'apollo-server-koa';

import { createServer } from 'http';

import { typeDefs, resolvers } from './api/schema';

const PORT = process.env.PORT || 8000;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      endpoint: 'http://localhost:8000/graphql',
    },
  });

  await server.start();

  const app = new Koa();
  server.applyMiddleware({ app });
  
  const httpServer = createServer(app);

  httpServer.on('request', app.callback());

  console.log('started');

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
}

startApolloServer();
