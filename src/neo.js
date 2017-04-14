// @flow
import {
  sendRequest,
  validateDate,
} from './util';

export default function neo(): Object {
  return {

    feed: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
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
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    feedToday: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          'api.nasa.gov',
          '/neo/rest/v1/feed/today',
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        )
      ),

    fetch: (asteroidId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!asteroidId) return reject(new Error('asteroidId is required'));
        return sendRequest(
          'api.nasa.gov',
          `/neo/rest/v1/neo/${asteroidId}`,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    browse: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          'api.nasa.gov',
          '/neo/rest/v1/neo/browse',
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        )
      ),

    stats: (): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          'api.nasa.gov',
          '/neo/rest/v1/stats',
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        )
      ),

  };
}
