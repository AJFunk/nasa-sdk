import Q from 'q';
import { sendRequest } from './util';

export default function patents(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest('https://api.nasa.gov/patents/content',
        options,
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
