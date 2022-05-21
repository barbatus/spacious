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
      const res = await Character.findByPlanet(root.code).count('id').first();
      return parseInt(res.count, 10);
    },
    pictureUrl: (root) => root.picture_url,
    characters: (root, { limit }) => Character.findByPlanet(root.code).limit(limit),
  }
};
