export const ACCESS_USER_KEY = 'access_user';

const get = () => window.localStorage.getItem(ACCESS_USER_KEY);
const set = accessToken => {
  window.localStorage.setItem(ACCESS_USER_KEY, JSON.stringify(accessToken));
};
const clear = () => {
  window.localStorage.removeItem(ACCESS_USER_KEY);
};

export default {
  get,
  set,
  clear,
};
