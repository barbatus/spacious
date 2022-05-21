import { Planet } from './planet.model';

export const queries = [`
  planet(id: Int!): Planet

  planets(page: Int, pageSize: Int): Planets
`];

export const resolvers = {
  async planet(_, { id }) {
    return await Planet.findById(id);
  },
  async planets(_, { page = 1, pageSize = 10 }) {
    page = Math.max(page, 1);
    pageSize = Math.min(pageSize, 100);
    const result = await Planet
      .select()
      .offset(pageSize*(page - 1))
      .limit(pageSize);
    return {
      pagination: {
        total: result.length,
        page,
        pageSize,
      },
      nodes: result,
    };
  }
};
