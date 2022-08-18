import { tester } from 'graphql-tester';
import { create as createExpressWrapper } from 'graphql-tester/lib/main/servers/express';
import app from '../../server';

export const testBed = (token = 'strapiBearerToken') => {
  return tester({
    server: createExpressWrapper(app),
    contentType: 'application/json',
    url: '/graphql',
    authorization: `Bearer ${token}`,
    jsonBody: true
  });
};
