export const ACCESS_TOKEN_KEY = 'access_token';
export const CURRENT_USER = 'current_user';

const get = () => window.localStorage.getItem(ACCESS_TOKEN_KEY);
const set = accessToken => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

const clear = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export default {
  get,
  set,
  clear,
};
