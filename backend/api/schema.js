import { loadSchema } from './schema-loader';

const schema = loadSchema();

export const typeDefs = [`
  type Pagination {
    total: Int!
    page: Int!
    pageSize: Int!
  }

  ${schema.typeDefs}
`];

export const resolvers = schema.resolvers;
