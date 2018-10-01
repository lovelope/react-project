// eslint-disable-next-line import/no-extraneous-dependencies
import lessToJs from 'less-vars-to-js';
import fs from 'fs';

export default function getTheme(path) {
  const themeContent = fs.readFileSync(path, 'utf8');

  const themes = lessToJs(themeContent, {
    resolveVariables: true,
    stripPrefix: true,
  });
  return themes;
}
