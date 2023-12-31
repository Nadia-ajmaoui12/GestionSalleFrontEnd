import axios from 'axios';
import ApiPathService from '../api/apiPathService.ts';

const request = (url, options) => {
  const baseApiPath = ApiPathService.getBasePath();

  return axios(`${baseApiPath}${url}`, options)
    .then(checkStatus)
    .then(res => res && res.data);
};

export const Get = (url, options) =>
  request(url, { ...options, method: 'GET' });

export const Delete = (url, options) =>
  request(url, { ...options, method: 'Delete' });

export const post = (url, options) =>
  request(url, { ...options, method: 'POST' });

export const put = (url, options) =>
  request(url, { ...options, method: 'PUT' });

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }

  const error = new Error(response.statusText);

  throw error;
};

export default request;
