import Q from 'q';
import {
  sendRequest,
  handleError,
} from './util';

export default function patents(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();

      sendRequest('https://api.nasa.gov/patents/content',
        options,
        (err: string, data: object): undefined => {
          if (err) return handleError(err, deferred);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
