// eslint-disable-next-line import/no-extraneous-dependencies
const shell = require('shelljs');

// 私有 sourceMap 服务器，确保只可以通过公司 VPN 访问
const PRIVATE_SOURCE_MAP_SERVER =
  'https://private.map.server.com/project/path/to/';

shell
  // 找到产出文件夹
  .find('dist')
  // 获取所有资源文件路径
  .filter(file => file.match(/\.(js|css)$/))
  .forEach(file => {
    // 对文件内容的 sourceMappingURL 进行替换
    shell.sed(
      '-i',
      'sourceMappingURL=(.*).map',
      `sourceMappingURL=${PRIVATE_SOURCE_MAP_SERVER}$1.map`,
      file
    );
  });
