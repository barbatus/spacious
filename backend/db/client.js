import Knex from 'knex';

import knexConfig from '../knexfile';

const ENV = process.env.NODE_ENV || 'development';

export default Knex(knexConfig[ENV]);
