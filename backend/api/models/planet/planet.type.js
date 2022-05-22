import { Planet } from './planet.model';
import { Character } from '../character/character.model';

export const types = [`
  type Planet {
    id: ID!

    name: String!

    description: String

    code: String

    pictureUrl: String

    population: Int

    characters(limit: Int!): [Character]
  }

  type Planets {
    pagination: Pagination!

    nodes: [Planet]
  }
`];

export const resolvers = {
  Planet: {
    population: async (root) => {
      if (root.population) return root.population;
      const res = await Planet.findCharacters(root.code);
      return res.length;
    },
    pictureUrl: (root) => root.picture_url,
    characters: (root, { limit }) => Planet.findCharacters(root.code).limit(limit),
  }
};
