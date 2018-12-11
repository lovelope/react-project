import 'whatwg-fetch';
import qs from 'qs';
import { merge } from 'lodash';
import { getToken, removeToken } from './helper';
import { LOGIN_URL } from './urls';

/* https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch#参数
options 参数
{
  'method': '',
  'headers': {},
  'body': {} -----> data,
  'mode': '',
  'credentials': '',
  'cache': '',
  'redirect': '',
  'referrer': '',
  'referrerPolicy': '',
  'integrity': ''
}; */
export default async function request(url, options) {
  const defaultOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {},
  };
  // eslint-disable-next-line no-param-reassign
  options = merge(defaultOptions, options);
  /* eslint-disable no-use-before-define */
  const config = await new Promise(resolve => {
    resolve({ url, options });
  })
    .then(processUrl)
    .then(processRequestHeaders)
    .then(processRequestContentType)
    .then(removeInvalidOptions);

  return fetch(config.url, config.options)
    .then(checkResponseStatus)
    .then(processResponseContentType)
    .then(processInvalidSession);
  /* eslint-enable no-use-before-define */
}
// headers参数动态获取getters
request.headerGetters = {
  authorization() {
    return `Bearer ${getToken()}`;
  },
};
// 设置headers参数
request.setHeader = (key, getter) => {
  request.headerGetters[key] = getter;
};
// 清除headers参数
request.removeHeader = key => {
  delete request.headerGetters[key];
};

// 处理url
function processUrl(config) {
  const {
    options: { params, query },
  } = config;
  if (typeof params === 'object') {
    // eslint-disable-next-line no-param-reassign
    config.url = config.url.replace(
      /:([a-z0-9_\-%]+)/gi,
      (source, $1) => params[$1] || ''
    );
  }
  if (typeof query === 'object') {
    const [url, search] = config.url.split('?');
    const queryString = qs.stringify(query);
    // eslint-disable-next-line no-param-reassign
    config.url = search
      ? `${config.url}&${queryString}`
      : `${url}?${queryString}`;
  }
  return config;
}
// 添加options的全局配置参数，比如token
function processRequestHeaders(config) {
  const {
    options: { headers },
  } = config;
  const getters = request.headerGetters;
  /* eslint-disable no-restricted-syntax, guard-for-in, no-prototype-builtins, no-param-reassign */
  for (const key in getters) {
    const value = getters[key]();
    if (value && !headers.hasOwnProperty(key)) {
      config.options.headers[key] = value;
    }
  }
  /* eslint-enable no-restricted-syntax, guard-for-in, no-prototype-builtins, no-param-reassign */
  return config;
}
// 自动添加Content-Type
function processRequestContentType(config) {
  const {
    options: { data, method, query },
  } = config;
  /* eslint-disable no-param-reassign */
  config.options.body = data;
  if (!config.options.headers['Content-Type']) {
    if (method === 'POST' || method === 'PUT') {
      if (data instanceof FormData) {
        config.options.headers['Content-Type'] = 'multipart/form-data';
      } else if (data instanceof Object) {
        config.options.body = JSON.stringify(data);
        config.options.headers['Content-Type'] =
          'application/json; charset=utf-8';
      }
    }
    if (typeof query === 'object') {
      config.options.headers['Content-Type'] =
        'application/x-www-form-urlencoded';
    }
  }
  /* eslint-enable no-param-reassign */
  return config;
}
// 移除无用的options参数，fetch api。
function removeInvalidOptions(config) {
  ['params', 'query', 'data'].forEach(key => {
    // eslint-disable-next-line no-param-reassign
    delete config.options[key];
  });
  return config;
}

const codeMessages = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
// 网络错误拦截
function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessages[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  console.warn(`"${response.url}"请求错误 ${response.status}: ${errortext}`);
  throw error;
}

const responseTypes = {
  'application/json': 'json',
  'text/html': 'text',
  'Blob/File': 'blob',
  'application/vnd.ms-excel': 'blob',
  FormData: 'formData',
  ArrayBuffer: 'arrayBuffer',
};
// response自动转化
function processResponseContentType(response) {
  const contentType = response.headers.get('content-type');
  let responseType = 'json';
  /* eslint-disable no-restricted-syntax, guard-for-in */
  for (const key in responseTypes) {
    if (contentType.includes(key)) {
      responseType = responseTypes[key];
      break;
    }
  }
  /* eslint-enable no-restricted-syntax, guard-for-in */
  return response[responseType]();
}

function processInvalidSession(response) {
  if (
    Number.parseInt(response.errcode, 10) &&
    Number.parseInt(response.errcode, 10) === 1041
  ) {
    // 登录信息失效
    removeToken();
    window.location.href = LOGIN_URL;
    const error = new Error(response.errmsg || response.message);
    error.name = response.errcode || response.code;
    error.response = response;
    console.warn(`"${response.url}"请求错误 ${error}`);
    throw error;
  }
  return response;
}
