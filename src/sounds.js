import Q from 'q';
import { sendRequest } from './util';

export default function sounds(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest('https://api.nasa.gov/planetary/sounds',
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
