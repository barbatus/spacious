import knex from 'knex';
import { Model } from '../model';

export class Planet extends Model {
  constructor() {
    super('planets');
  }

  static query() {
    return new Planet().builder;
  }

  static selectPage(page, pageSize) {
    return this
      .select('planets.*')
      .leftJoin('characters', 'planets.code', '=', 'characters.planet')
      .count('characters.id as population')
      .groupBy('planets.id')
      .offset(pageSize*(page - 1))
      .limit(pageSize);
  }

  static findCharacters(planet) {
    return this
      .join('characters', 'planets.code', '=', 'characters.planet')
      .where('planets.code', planet)
      .select('characters.*');
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
