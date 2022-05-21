import { Model } from '../model';

export class Planet extends Model {
  constructor() {
    super('planets');
  }

  static query() {
    return new Planet().builder;
  }

  static findCharacters(planet) {
    return this.join('characters', 'planets.code', '=', 'characters.planet')
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
