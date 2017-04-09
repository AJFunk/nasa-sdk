import axios from 'axios';
import { apiKey } from './config';

const sendRequest = (endpoint: string, options: object = {}, cb: object): undefined => {
  let url = `${endpoint}?`;
  if (options) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        url = `${url}${key}=${options[key]}&`;
      }
    }
  }
  if (apiKey) url = `${url}api_key=${apiKey}`;
  return axios
    .get(url)
    .then((res: object): object => cb(null, res.data))
    .catch((err: object): object => cb(err));
};

export {
  sendRequest,
};
