import { Model } from '../model';

export class Character extends Model {
  constructor() {
    super('characters');
  }

  static query() {
    return new Character().builder;
  }

  static async selectPage(planetCode, page, pageSize) {
    const query = planetCode ?
      this.select('characters.*').where('planet', planetCode) :
      this.select('characters.*');
    const result = await query
      .leftJoin('friendship', 'characters.id', '=', 'friendship.character_id')
      .count('friendship.character_id as friendsCount')
      .groupBy('characters.id')
      .offset(pageSize*(page - 1))
      .limit(pageSize);
    this.save(result);
    return result;
  }

  static countFriends(id) {
    return this
      .where('characters.id', id)
      .leftJoin('friendship', 'characters.id', '=', 'friendship.character_id')
      .count('friendship.friend_id as count')
      .groupBy('characters.id')
      .first()
  }

  static async findFriends(id, limit) {
    const result = await this
      .join('friendship', 'characters.id', '=', 'friendship.friend_id')
      .where('friendship.character_id', id)
      .select('characters.*')
      .limit(limit);
    this.save(result);
    return result;
  }
}
