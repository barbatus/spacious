import assert from 'assert';
import { testBed } from './utils';

describe('Planet', () => {
  describe('queries', () => {
    it('should return array of planets', () => {
      return testBed()
        .query('{ planets {id} }')
        .then((resp) => {
          assert.equal(resp.status, 200);
          assert.ok(resp.success);
          assert(resp.data.nodes.length > 0);
        });
    });

    it('should return pagination info correctly', () => {
      return testBed().query('{ planets(page: 1) {id} }')
        .then((resp) => {
          assert.equal(resp.status, 200);
          assert.ok(resp.success);
          assert.ok(resp.data.pagination);
          assert(resp.data.pagination.count, 4);
          assert(resp.data.pagination.pageSize, 10);
        });
    });

    it('should query planet', () => {
      return testBed()
        .query(`{ planet(id: "1") { id name } }`)
        .then(resp => {
          assert.equal(resp.status, 200);
          assert.ok(resp.success);
          assert.ok(resp.data.planet.id);
          assert.ok(resp.data.planet.name);
        });
    });
  });
});
