import { Character } from './character.model';

export const queries = [`
  character(id: Int!): Character

  characters(page: Int, pageSize: Int, planet: String): Characters
`];

export const resolvers = {
  async character(_, { id }) {
    return Character.loader().load(id);
  },

  async characters(_, { page = 1, pageSize = 10, planet }) {
    page = Math.max(page, 1);
    pageSize = Math.min(pageSize, 100);
    const [count, characters] =
      await Promise.all([Character.fastTotal(), Character.selectPage(planet, page, pageSize)]);
    return {
      pagination: {
        total: count,
        page,
        pageSize,
      },
      nodes: characters,
    };
  },
};
