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
    const [count, planets] = await Promise.all([Planet.fastTotal(), Planet.selectPage(page, pageSize)]);
    return {
      pagination: {
        total: count,
        page,
        pageSize,
      },
      nodes: planets,
    };
  }
};
