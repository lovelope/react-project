import * as Cookies from 'js-cookie';

const TOKEN_NAME = 'token';

const getToken = (): string => Cookies.get(TOKEN_NAME) || '';

const removeToken = (): void => Cookies.remove(TOKEN_NAME);

export { getToken, removeToken };
