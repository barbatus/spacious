import { Model } from '../model';

export class Planet extends Model {
  constructor() {
    super('planets');
  }

  static query() {
    return new Planet().builder;
  }

  findCharacters(planet) {
    return this.builder
      .join('characters', 'planets.code', '=', 'characters.planet')
      .where('planets.code', planet)
      .select('characters.*');
  }
}
