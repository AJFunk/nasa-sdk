import Q from 'q';
import {
  sendRequest,
  validateDate,
} from './util';

export default function neo(): object {
  return {

    feed(options: object = {}): undefined {
      const deferred = Q.defer();
      if (!options.start_date) deferred.reject(new Error('start_date is required'));
      if (!validateDate(options.start_date)) {
        deferred.reject(new Error('start_date must be in "YYYY-MM-DD" format'));
      }
      if (options.end_date && !validateDate(options.start_date)) {
        deferred.reject(new Error('end_date must be in "YYYY-MM-DD" format'));
      }
      sendRequest('https://api.nasa.gov/neo/rest/v1/feed',
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
      sendRequest('https://api.nasa.gov/neo/rest/v1/feed/today',
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

    browse(options: object = {}): undefined {
      const deferred = Q.defer();
      sendRequest('https://api.nasa.gov/neo/rest/v1/neo/browse',
        options,
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    stats(): undefined {
      const deferred = Q.defer();
      sendRequest('https://api.nasa.gov/neo/rest/v1/stats',
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
