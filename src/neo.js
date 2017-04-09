import Q from 'q';
import { sendRequest } from './util';

export default function neo(): object {
  return {

    feed(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest('neo/rest/v1/feed',
        options,
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    feedToday(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest('neo/rest/v1/feed/today',
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
      sendRequest(`neo/rest/v1/neo/${asteroidId}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    browse(): undefined {
      const deferred = Q.defer();
      sendRequest('neo/rest/v1/neo/browse',
        {},
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    stats(): undefined {
      const deferred = Q.defer();
      sendRequest('neo/rest/v1/stats',
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
