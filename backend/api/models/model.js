import dbClient from '../../db/client';

export class Model {
  constructor(tableName) {
    this.builder = dbClient(tableName);
    this.builder.table = tableName;
  }

  static async fastTotal() {
    const query = this.query();
    const res = await this.exec(`SELECT reltuples AS estimate FROM pg_class where relname = '${query.table}'`);
    return Math.max(res.rows[0].estimate, 0);
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

  static exec(...args) {
    return dbClient.raw(...args);
  }
}
