// eslint-disable-next-line import/no-extraneous-dependencies
import lessToJs from 'less-vars-to-js';
import fs from 'fs';

export default function getTheme(path: string): Record<string, unknown> {
  let themeContent = '';

  // 解决 theme 文件不存在的异常
  try {
    themeContent = fs.readFileSync(path, 'utf8');
  } catch (error) {
    console.error('【错误】读取主题文件异常', error);
    themeContent = '';
  }

  const themes = lessToJs(themeContent, {
    resolveVariables: true,
    stripPrefix: true,
  });
  return themes;
}
