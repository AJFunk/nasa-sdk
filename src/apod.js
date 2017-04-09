import Q from 'q';
import { sendRequest } from './util';

export default function apod(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest('https://api.nasa.gov/planetary/apod', options, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

  };
}
