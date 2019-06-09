import webpack from 'webpack';
import paths from './paths.js';

export default {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'mobx', 'mobx-react'],
  },
  output: {
    path: paths.appDistDll,
    filename: 'vendor.dll.js', // 输出动态连接库的文件名称
    library: '_dll_vendor', // 全局变量名称
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_vendor', // 和output.library中一致，也就是输出的manifest.json中的 name值
      path: paths.appDistDllManifestJson,
    }),
  ],
};
