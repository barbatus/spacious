import knex from 'knex';

import { Model } from '../model';
import { Character } from '../character/character.model';

export class Planet extends Model {
  constructor() {
    super('planets');
  }

  static query() {
    return new Planet().builder;
  }

  static async selectPage(page, pageSize) {
    const result = await this
      .select('planets.*')
      .leftJoin('characters', 'planets.code', '=', 'characters.planet')
      .count('characters.id as population')
      .groupBy('planets.id')
      .offset(pageSize*(page - 1))
      .limit(pageSize);
    this.save(result);
    return result;
  }

  static async findCharacters(planet, limit) {
    const result = await this
      .join('characters', 'planets.code', '=', 'characters.planet')
      .where('planets.code', planet)
      .select('characters.*')
      .limit(limit);
      Character.save(result);
    return result;
  }

  static findByCode(code) {
    return this.where('code', code).first();
  }

  static findByCharacter(characterId) {
    return this.join('characters', 'planets.code', '=', 'characters.planet')
      .where('characters.id', characterId)
      .select('planets.*')
      .first();
  }
}
