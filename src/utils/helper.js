import * as Cookies from 'js-cookie';

const TOKEN_NAME = 'token';

const getToken = () => Cookies.get(TOKEN_NAME) || '';

const removeToken = () => Cookies.remove(TOKEN_NAME);

export { getToken, removeToken };
