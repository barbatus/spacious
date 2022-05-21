import dbClient from '../../db/client';

export class Model {
  constructor(tableName) {
    this.builder = dbClient(tableName);
  }

  static findById(id) {
    return this.query().where('id', id).first();
  }

  static where(...args) {
    return this.query().where(...args);
  }

  static select(...args) {
    return this.query().select(...args);
  }

  static join(...args) {
    return this.query().join(...args);
  }

  static insert(...args) {
    return this.query().insert(...args);
  }
}
