// plugins 在 presets 前执行
module.exports = {
  // plugins 加载顺序，数组从前往后
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 修饰器支持，顺序必须在 `proposal-class-properties` 之前
    '@babel/plugin-proposal-class-properties', // 支持 `handleChange = () => {}` 语法
    '@babel/plugin-syntax-dynamic-import', // 支持 `() => import('./Home')` 语法
    '@babel/plugin-transform-runtime',
    [
      'import',
      { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
      'antd',
    ], // 按需加载 `antd` 组件， `style: true` 会加载 less 文件
  ],

  // presets 加载顺序，数组从后往前
  // 先执行 `react`， 然后执行 `env`
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
