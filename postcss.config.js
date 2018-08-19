/* eslint-disable global-require, import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'), // 解决flex的bug
    require('autoprefixer'), // css前缀补全，autoprefixer 使用.browserlistrc或者package.json的browserlist字段
  ],
};
