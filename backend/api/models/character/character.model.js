import { Model } from '../model';

export class Character extends Model {
  constructor() {
    super('characters');
  }

  static query() {
    return new Character().builder;
  }

  static findByPlanet(planetCode) {
    return planetCode ? this.where('planet', planetCode) : this.select();
  }

  static findFriends(id) {
    return this.join('friendship', 'characters.id', '=', 'friendship.friend_id')
      .where('friendship.character_id', id)
      .select('characters.*');
  }
}
