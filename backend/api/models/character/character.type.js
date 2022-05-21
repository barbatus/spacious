import { Character } from './character.model';

export const types = [`
  type Character {
    id: ID!

    name: String!

    description: String

    pictureUrl: String

    friendsCount: Int
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
      const res = await Character.findFriends(root.id);
      return parseInt(res.length, 10);
    },  
  },
};
