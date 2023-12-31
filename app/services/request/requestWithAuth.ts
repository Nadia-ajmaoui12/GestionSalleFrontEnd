// import history from "../../utils/history";
import request from './request.ts';
// eslint-disable-next-line import/no-unresolved
import AccessTokenStorage from '../security/accessTokenStorage';

const requestWithAuth = (url, options) => {
  const optionsWithAuth = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${AccessTokenStorage.get()}`,
    },
  };

  return request(url, optionsWithAuth).catch(e => {
    if (e.response && e.response.status === 401) {
      AccessTokenStorage.clear();
      // history.push("/login");
    } else {
      throw e;
    }
  });
};

export const getApi = (url, options) =>
  requestWithAuth(url, { ...options, method: 'GET' });

export const postApi = (url, options) =>
  requestWithAuth(url, { ...options, method: 'POST' });

export const putApi = (url, options) =>
  requestWithAuth(url, { ...options, method: 'PUT' });

export default requestWithAuth;
