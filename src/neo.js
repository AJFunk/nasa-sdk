import Q from 'q';
import { sendRequest } from './util';

export default function neo(): object {
  return {

    feed(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest('https://api.nasa.gov/neo/rest/v1/feed',
        options,
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    fetch(asteroidId: string): undefined {
      const deferred = Q.defer();
      if (!asteroidId) deferred.reject(new Error('asteroidId is required'));
      sendRequest(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
