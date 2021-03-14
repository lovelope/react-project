require('regenerator-runtime');
require('@babel/register')({
  extensions: ['.ts', '.js'],
});

const webpackConfigProd = require('./tools/webpack.config.production.babel.ts')
  .default;
const webpackConfigDev = require('./tools/webpack.config.development.babel.ts')
  .default;

if (process.env.NODE_ENV === 'production') {
  module.exports = webpackConfigProd;
} else {
  module.exports = webpackConfigDev;
}
