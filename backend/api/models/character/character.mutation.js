import { Character } from './character.model';

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
    const res = await Character.insert({
      name: character.name,
      planet: character.planet,
      picture_url: character.pictureUrl,
      description: character.description || null,
    }).returning('*');
    return res[0];
  },
};