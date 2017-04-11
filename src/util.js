import axios from 'axios';
import { apiKey } from './config';

const sendRequest = (endpoint: string,
                     options: object = {},
                     cb: object,
                     noKey: boolean): undefined => {
  let url = `${endpoint}?`;
  if (options) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const validKey = typeof options[key] === 'string' ?
          options[key].replace(/\s/g, '%20') : options[key];
        url = `${url}${key}=${validKey}&`;
      }
    }
  }
  if (apiKey && !noKey) url = `${url}api_key=${apiKey}`;
  if (url[url.length - 1] === '&') url = url.substr(0, url.length - 1);
  return axios
    .get(url)
    .then((res: object): object => cb(null, res.data))
    .catch((err: object): object => cb(err));
};

const handleError = (message: string, deferred: object): undefined => {
  deferred.reject(new Error(message));
  return deferred.promise;
};

const validateDate = (date: string): boolean => {
  if (!date || typeof date !== 'string') return false;
  return date.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

const validateDateTime = (date: string): boolean => {
  if (!date || typeof date !== 'string') return false;
  return date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/) !== null;
};

export {
  handleError,
  sendRequest,
  validateDate,
  validateDateTime,
};
