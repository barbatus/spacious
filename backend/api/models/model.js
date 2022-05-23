import DataLoader from 'dataloader';

import dbClient from '../../db/client';

const loaders = {};

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

  static loader() {
    const query = this.query();
    if (!loaders[query.table]) {
      loaders[query.table] = new DataLoader((ids) => this.findByIds(ids));
    }
    return loaders[query.table];
  }

  static findByIds(ids) {
    return this.query().whereIn('id', ids);
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

  static save(items) {
    items.forEach((item) => {
      this.loader().clear(item.id).prime(item.id, item);
    });
  }
}
