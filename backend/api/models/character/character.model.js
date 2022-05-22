import { Model } from '../model';

export class Character extends Model {
  constructor() {
    super('characters');
  }

  static query() {
    return new Character().builder;
  }

  static selectPage(planetCode, page, pageSize) {
    const query = planetCode ?
      this.select('characters.*').where('planet', planetCode) :
      this.select('characters.*');
    return query
      .leftJoin('friendship', 'characters.id', '=', 'friendship.character_id')
      .count('friendship.character_id as friendsCount')
      .groupBy('characters.id')
      .offset(pageSize*(page - 1))
      .limit(pageSize);
  }

  static countFriends(id) {
    return this
      .where('characters.id', id)
      .leftJoin('friendship', 'characters.id', '=', 'friendship.character_id')
      .count('friendship.friend_id as count')
      .groupBy('characters.id')
      .first()
  }

  static findFriends(id) {
    return this
      .join('friendship', 'characters.id', '=', 'friendship.friend_id')
      .where('friendship.character_id', id)
      .select('characters.*');
  }
}
