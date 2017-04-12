import {
  sendRequest,
  validateDate,
} from './util';

export default function neo(): object {
  return {

    feed(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (options.hasOwnProperty('start_date') && !validateDate(options.start_date)) {
          return reject(new Error('start_date must be in "YYYY-MM-DD" format'));
        }
        if (options.hasOwnProperty('end_date') && !validateDate(options.end_date)) {
          return reject(new Error('end_date must be in "YYYY-MM-DD" format'));
        }
        return sendRequest(
          'api.nasa.gov',
          '/neo/rest/v1/feed',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    feedToday(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest(
          'api.nasa.gov',
          '/neo/rest/v1/feed/today',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        )
      );
    },

    fetch(asteroidId: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!asteroidId) return reject(new Error('asteroidId is required'));
        return sendRequest(
          'api.nasa.gov',
          `/neo/rest/v1/neo/${asteroidId}`,
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    browse(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest(
          'api.nasa.gov',
          '/neo/rest/v1/neo/browse',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        )
      );
    },

    stats(): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest(
          'api.nasa.gov',
          '/neo/rest/v1/stats',
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        )
      );
    },

  };
}
