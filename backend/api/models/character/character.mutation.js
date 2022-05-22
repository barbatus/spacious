import { Planet } from '../planet/planet.model';
import { Character } from './character.model';

import { ApolloError } from 'apollo-server-errors';

export const mutations = [`
  createCharacter(character: CharacterInput!): Character
`];

export const types = [`
  input CharacterInput {
    name: String!
    planet: String!
    pictureUrl: String
    description: String
  }
`];

export const resolvers = {
  createCharacter: async (root, { character }) => {
    const planet = await Planet.findByCode(character.planet);
    if (!planet) {
      throw new ApolloError(`There is no Planet with code ${character.planet}`, 'CUSTOM_ERROR');
    }
    const res = await Character.insert({
      name: character.name,
      planet: character.planet,
      picture_url: character.pictureUrl,
      description: character.description || null,
    }).returning('*');
    return res[0];
  },
};