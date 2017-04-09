import axios from 'axios';
import Q from 'q';
import { apiKey } from './config';

export default function apod(): object {
  function sendRequest(options: object = {}, cb: object): undefined {
    let url = 'https://api.nasa.gov/planetary/apod?';
    if (options) {
      if (options.date) url = `${url}date=${options.date}&`;
      if (options.hd) url = `${url}hd=${options.hd}&`;
    }
    if (apiKey) url = `${url}api_key=${apiKey}`;
    axios
      .get(url)
      .then((res: object): object => cb(null, res.data))
      .catch((err: object): object => cb(err));
  }

  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest(null, options, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

  };
}
