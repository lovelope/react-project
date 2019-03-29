/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import qs from 'qs';
import { merge } from 'lodash';
// import { supplierNavigator, marketNavigator } from './navigator';
import { getToken } from './helper';
import { LOGOUT_URL } from './urls';
import { AUTH_ERROR_CODE } from './code';

const { toString } = Object.prototype;

const isObject = (value: any) => toString.call(value) === '[object Object]';

type Tbody =
  | string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | Iobject
  | null;

interface IfetchCommonOptions {
  headers?: Headers | Record<string, string> | string[][];
  mode?: 'cors' | 'no-cors' | 'same-origin';
  credentials?: 'omit' | 'same-origin' | 'include';
  cache?:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'no-cache'
    | 'force-cache'
    | 'only-if-cached';
  redirect?: 'follow' | 'error' | 'manual';
  referrer?: 'no-referrer' | 'client';
  referrerPolicy?:
    | ''
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin-when-cross-origin'
    | 'unsafe-url'
    | 'origin-only';
  integrity?: string;
}

interface IrequestInitOptions {
  defaultOptions?: IfetchCommonOptions;
  transformRequest?: TinterceptorPair<TresquestInterceptorOptions>[];
  transformResponse?: TinterceptorPair<TresponseInterceptorOptions>[];
}

interface IfetchOptions extends IfetchCommonOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
  body?: Tbody;
}

interface Iobject {
  [prop: string]: any;
}

interface IinputOptions extends IfetchOptions {
  params?: Iobject;
  query?: Iobject;
  transformRequest?: TinterceptorPair<TresquestInterceptorOptions>[];
  transformResponse?: TinterceptorPair<TresponseInterceptorOptions>[];
}

type TresquestInterceptorOptions = IinputOptions & {
  url: string;
};

type TresponseInterceptorOptions =
  | Response
  | Blob
  | FormData
  | ArrayBuffer
  | string
  | never
  | any;

type Tidentity<T> = (arg: T) => T;

type TinterceptorPair<T = any> = {
  onFulfilled: Tidentity<T>;
  onRejected?: Tidentity<any>;
} | null;

class InterceptorsManager<T = {}> {
  public interceptors: TinterceptorPair<T>[];

  public constructor(interceptors: TinterceptorPair<T>[] = []) {
    this.interceptors = interceptors;
  }

  public use(onFulfilled: Tidentity<T>, onRejected?: Tidentity<any>): number {
    const interceptorPair: TinterceptorPair<T> = { onFulfilled };
    if (onRejected) {
      interceptorPair.onRejected = onRejected;
    }
    this.interceptors.push(interceptorPair);
    return this.interceptors.length;
  }

  public eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }

  public compose(
    promise: Promise<T>,
    extraInterceptors: TinterceptorPair<T>[] = []
  ) {
    return extraInterceptors.concat(this.interceptors).reduce((acc, pair) => {
      if (!pair) {
        return acc;
      }
      const { onFulfilled, onRejected } = pair;
      if (onRejected) {
        return acc.then(onFulfilled, onRejected);
      }
      return acc.then(onFulfilled);
    }, promise);
  }
}

class R {
  public interceptors: {
    request: InterceptorsManager<TresquestInterceptorOptions>;
    response: InterceptorsManager<TresponseInterceptorOptions>;
  };

  public defaultOptions: IfetchCommonOptions;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(initOptions: IrequestInitOptions = {}) {
    const {
      defaultOptions = {},
      transformRequest = [],
      transformResponse = [],
    } = initOptions;
    this.interceptors = {
      request: new InterceptorsManager<TresquestInterceptorOptions>(
        transformRequest
      ),
      response: new InterceptorsManager<TresponseInterceptorOptions>(
        transformResponse
      ),
    };
    this.defaultOptions = defaultOptions;
  }

  public fetch(url: string, options: IinputOptions) {
    const fullInputOptions = merge({}, this.defaultOptions, options);
    const {
      transformRequest,
      transformResponse,
      ...restOptions
    } = fullInputOptions;

    let requestPromise = Promise.resolve({ url, ...restOptions });
    requestPromise = this.interceptors.request.compose(
      requestPromise,
      transformRequest
    );

    let responsePromise = requestPromise.then(
      // eslint-disable-next-line
      ({ url, params, query, ...options }) => fetch(url, options as any)
    );
    responsePromise = this.interceptors.response.compose(
      responsePromise,
      transformResponse
    );
    return responsePromise as Promise<any>;
  }

  public get<R = ResponseSchema>(url: string, options: IinputOptions = {}) {
    const result = this.fetch(url, { ...options, method: 'GET' });
    return result as Promise<R>;
  }

  public post<R = ResponseSchema>(url: string, options: IinputOptions = {}) {
    const result = this.fetch(url, { ...options, method: 'POST' });
    return result as Promise<R>;
  }

  public put<R = ResponseSchema>(url: string, options: IinputOptions = {}) {
    const result = this.fetch(url, { ...options, method: 'PUT' });
    return result as Promise<R>;
  }

  public patch<R = ResponseSchema>(url: string, options: IinputOptions = {}) {
    const result = this.fetch(url, { ...options, method: 'PATCH' });
    return result as Promise<R>;
  }

  public head<R = ResponseSchema>(url: string, options: IinputOptions = {}) {
    const result = this.fetch(url, { ...options, method: 'HEAD' });
    return result as Promise<R>;
  }

  public delete<R = ResponseSchema>(url: string, options: IinputOptions = {}) {
    const result = this.fetch(url, { ...options, method: 'DELETE' });
    return result as Promise<R>;
  }
}

function authorize(options: TresquestInterceptorOptions) {
  // eslint-disable-next-line no-param-reassign
  options.headers = Object.assign(options.headers || {}, {
    Accept: 'application/json, */*',
    authorization: `Bearer ${getToken()}`,
  });
  return options;
}

function fillParams(options: TresquestInterceptorOptions) {
  const { url, params } = options;
  if (params) {
    // eslint-disable-next-line no-param-reassign
    options.url = url.replace(
      /:([a-z0-9_\-%]+)/gi,
      (source, $1) => params[$1] || ''
    );
  }
  return options;
}

function serializeQuery(options: TresquestInterceptorOptions) {
  const { url, query } = options;
  if (query) {
    const search = url.split('?')[1];
    // eslint-disable-next-line no-param-reassign
    options.url = url + (search ? '&' : '?') + qs.stringify(query);
  }
  return options;
}

function addContentType(options: TresquestInterceptorOptions) {
  const { body, method, query } = options;
  let { headers } = options;
  if (!headers) {
    // eslint-disable-next-line no-param-reassign
    options.headers = {};
    headers = options.headers;
  }
  if (!headers['Content-Type']) {
    if (method === 'POST' || method === 'PUT') {
      if (isObject(body)) {
        // eslint-disable-next-line no-param-reassign
        options.body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json; charset=utf-8';
      }
    }
    if (query) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  } else if (body instanceof FormData) {
    delete headers['Content-Type'];
  }
  return options;
}

const errCodeMessages = {
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

function isResponseStatusOk(response: Response): boolean {
  const { status } = response;
  return (status >= 200 && status < 300) || status === 304;
}

interface ResponseError extends Error {
  status: number;
  response: Response;
}

function throwError(response: Response): never {
  const errortext = errCodeMessages[response.status] || response.statusText;
  const error = new Error(errortext);
  const myError = error as ResponseError;
  myError.status = response.status;
  myError.response = response;
  console.warn(`"${response.url}"请求错误 ${response.status}: ${errortext}`);
  throw myError;
}

function checkResponseStatus(response: Response): Response | never {
  if (isResponseStatusOk(response)) {
    return response;
  }
  return throwError(response);
}

const responseTypes = {
  'application/json': 'json',
  'text/html': 'text',
  'Blob/File': 'blob',
  'application/vnd.ms-excel': 'blob',
  FormData: 'formData',
  ArrayBuffer: 'arrayBuffer',
};

function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  let responseType = '';
  if (contentType) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in responseTypes) {
      if (contentType.includes(key)) {
        responseType = responseTypes[key];
        break;
      }
    }
  }

  return responseType ? response[responseType]() : response;
}

function checkCode(response: ResponseSchema) {
  const code = parseInt(`${response.code}`, 10);
  if (code === AUTH_ERROR_CODE) {
    window.location.href = LOGOUT_URL;
  }
  return response;
}

const request = new R();

request.interceptors.request.use(authorize);
request.interceptors.request.use(fillParams);
request.interceptors.request.use(serializeQuery);
request.interceptors.request.use(addContentType);

request.interceptors.response.use(checkResponseStatus);
request.interceptors.response.use(parseResponse);
request.interceptors.response.use(checkCode);

export default request;

export interface ResponseSchema<T = any> {
  code: number | string;
  errcode: number | string;
  message: string;
  data: T;
  pagination: Ipagination;
}

// 示例
// interface Iuser {
//   name: string;
//   homeAddress: string;
// }
// request
//   .post<ResponseSchema<Iuser>>('/api/user/:id', {
//     params: { id: '1' },
//     query: { age: 12 },
//   })
//   .then(res => {
//     console.log(res.code);
//     console.log(res.errcode);
//     console.log(res.message);
//     console.log(res.data.name);
//     console.log(res.data.homeAddress);
//   });

// request.post<Blob>('/api/download').then(res => {
//   console.log(res instanceof Blob);
// });
