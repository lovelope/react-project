import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// 查找入口文件，可能是 ts 也可能是 js
const resolveModule = (resolveFn, filePath) => {
  const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
  const extension = moduleFileExtensions.find(ext =>
    fs.existsSync(resolveFn(`${filePath}.${ext}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

export const PUBLIC_PATH = '/'; // publicPath

// 绝对路径，加快文件检索速度
const paths = {
  appRoot: appDirectory,
  appDist: resolveApp('dist'), // 构建产出文件夹
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appEntry: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  appTheme: resolveApp('src/theme.less'),
  appDistDll: resolveApp('dist/dll'),
  appDistDllJs: resolveApp('dist/dll/vendor.dll.js'),
  appDistDllManifestJson: resolveApp('dist/dll/vendor.manifest.json'),
};

export default paths;
