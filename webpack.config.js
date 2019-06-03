require('@babel/register');

const webpackConfigProd = require('./tools/webpack.config.production.babel.js')
  .default;
const webpackConfigDev = require('./tools/webpack.config.development.babel.js')
  .default;

if (process.env.NODE_ENV === 'production') {
  module.exports = webpackConfigProd;
} else {
  module.exports = webpackConfigDev;
}
