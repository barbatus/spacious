import fs from 'fs';
import path from 'path';

export const loadSchema = (src = './models') => {
  const srcdir = path.join(__dirname, src);

  const gqlTypes = [];
  const gqlQueries = [];
  const gqlMutations = [];

  const gqlResolvers = {
    type: [],
    query: [],
    mutation: []
  };

  fs.readdirSync(srcdir)
    .filter(file => {
      return fs.statSync(path.join(srcdir, file)).isDirectory();
    })
    .forEach(dirName => {
      const dir = path.join(srcdir, dirName);

      fs.readdirSync(dir)
        .forEach(file => {
          const filename = path.join(dir, file);
          let definition;

          switch (true) {
            case /\.type\.js$/.test(file):
              definition = fs.existsSync(filename) ? require(filename) : {};
              gqlTypes.push(definition.types);
              gqlResolvers.type.push(definition.resolvers);
              break;
            case /\.query\.js$/.test(file):
              definition = fs.existsSync(filename) ? require(filename) : {};
              gqlTypes.push(definition.types);
              gqlQueries.push(definition.queries);
              gqlResolvers.query.push(definition.resolvers);
              break;
            case /\.mutation\.js$/.test(file):
              definition = fs.existsSync(filename) ? require(filename) : {};
              gqlTypes.push(definition.types);
              gqlMutations.push(definition.mutations);
              gqlResolvers.mutation.push(definition.resolvers);
              break;
          }
        });
    });

  const typeDefs = [`
    ${gqlTypes.join('')}

    type Query {
      ${gqlQueries.join('')}
    }

    type Mutation {
      ${gqlMutations.join('')}
    }
  `];

  const resolvers = {
    ...Object.assign({},...gqlResolvers.type),
    Query: Object.assign({}, ...gqlResolvers.query),
    Mutation: Object.assign({}, ...gqlResolvers.mutation),
  };

  return {
    typeDefs,
    resolvers,
  };
};
