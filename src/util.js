// @flow
import https from 'https';
import { apiKey } from './config';

const sendRequest = (baseurl: string,
                     endpoint: string,
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

  const params = {
    host: baseurl,
    path: url,
    method: 'GET',
  };

  const req = https.request(params, (res: object): null => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      return cb(`statusCode=${res.statusCode}`);
    }
    const buf = [];
    res.on('data', (c: object): object => buf.push(c));
    res.on('end', (): object => cb(null, JSON.parse(Buffer.concat(buf))));
    return null;
  });
  req.on('error', (err: object): object => cb(err));
  req.end();
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
  sendRequest,
  validateDate,
  validateDateTime,
};
