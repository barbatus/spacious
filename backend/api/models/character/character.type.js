import { Character } from './character.model';
import { Planet } from '../planet/planet.model';

export const types = [`
  type Character {
    id: ID!

    name: String!

    description: String

    pictureUrl: String

    friendsCount: Int

    friends(limit: Int!): [Character]

    planet: Planet
  }

  type Characters {
    pagination: Pagination!

    nodes: [Character]
  }
`];

export const resolvers = {
  Character: {
    pictureUrl: (root) => root.picture_url,
    friendsCount: async (root) => {
      if (root.friendsCount) return root.friendsCount;
      const res = await Character.countFriends(root.id);
      return parseInt(res.count, 10);
    },
    friends: (root, { limit }) => Character.findFriends(root.id, limit),
    planet: (root) => Planet.findByCharacter(root.id),
  },
};
