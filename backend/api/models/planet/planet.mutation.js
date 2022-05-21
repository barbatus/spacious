import { Planet } from './planet.model';

export const mutations = [`
  createPlanet(planet: PlanetInput!): Planet
`];

export const types = [`
  input PlanetInput {
    name: String!
    code: String!
    pictureUrl: String
    description: String
  }
`];

export const resolvers = {
  createPlanet: async (root, { planet }) => {
    const res = await Planet.insert({
      name: planet.name,
      code: planet.code,
      picture_url: planet.pictureUrl,
      description: planet.description || null,
    }).returning('*');
    return res[0];
  },
};
