const path = require('path');

module.exports = {
  webpack: function(config, env) {
    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf));
    loaders.oneOf.unshift({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    config.resolve = {
      ...config.resolve,
      alias: { '~': path.resolve(__dirname, 'src') },
    };
    return config;
  },
};

