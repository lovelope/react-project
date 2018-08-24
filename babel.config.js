module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import', // 支持 `() => import('./Home')` 语法
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties', // 支持 `handleChange = () => {}` 语法
    [
      'import',
      { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
      'antd',
    ], // 按需加载 `antd` 组件， `style: true` 会加载 less 文件
  ],
};
