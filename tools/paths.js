import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export const PUBLIC_PATH = '/'; // publicPath

// 绝对路径，加快文件检索速度
const paths = {
  appRoot: appDirectory,
  appDist: resolveApp('dist'), // 构建产出文件夹
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  appTheme: resolveApp('src/theme.less'),
  appDistDll: resolveApp('dist/dll'),
  appDistDllJs: resolveApp('dist/dll/vendor.dll.js'),
  appDistDllManifestJson: resolveApp('dist/dll/vendor.manifest.json'),
};

export default paths;
