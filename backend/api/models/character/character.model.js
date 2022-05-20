import { Model } from '../model';

export class Character extends Model {
  constructor() {
    super('characters');
  }

  static query() {
    return new Character().builder;
  }

  static findByPlanet(planet) {
    return planet ? this.where('planet', planet) : this.select();
  }

  static findFriends(id) {
    return this.join('friendship', 'characters.id', '=', 'friendship.friend_id')
      .where('friendship.character_id', id)
      .select('characters.*');
  }
}
