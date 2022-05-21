import { Character } from './character.model';

export const queries = [`
  character(id: Int!): Character

  characters(page: Int, pageSize: Int, planet: String): Characters
`];

export const resolvers = {
  async character(_, { id }) {
    return await Character.findById(id);
  },

  async characters(_, { page = 1, pageSize = 10, planet }) {
    page = Math.max(page, 1);
    pageSize = Math.min(pageSize, 100);
    const result = await Character
      .findByPlanet(planet)
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
  },
};
