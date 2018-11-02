/**
 * 根据环境变量获取相应值
 * 根据 npm start --[参数] 进行环境切换, 例如 `npm start --qa` 或者 `npm run build -- online`
 * @param {*} obj 对象
 * @param {*} field key 值
 */

/**
 * 根据 npm start --[参数] 进行环境切换, 例如 `npm start --qa` 或者 `npm run build -- online`
 * @param {Object} obj 对象
 * @param {Object} param1 { @param {String} field key 值, @param {String} defaultEnv 默认环境}
 */
export default function getValueByEnv(obj, { field = '', defaultEnv = 'dev' }) {
  let value = obj[defaultEnv];
  Object.keys(obj).forEach(envKey => {
    if (process.env[`npm_config_${envKey}`]) {
      value = obj[envKey];
    }
  });
  if (field) {
    return value[field];
  }
  return value;
}
