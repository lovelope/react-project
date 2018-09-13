// plugin的 {key: value} 对应 { pluginName: pluginOptions }，postcss会自动查找插件

module.exports = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-preset-env': {
      stage: 3,
    },
    cssnano: ctx.env === 'production' ? {} : false,
  },
});
