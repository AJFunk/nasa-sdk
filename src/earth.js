// @flow
import {
  sendRequest,
  validateDate,
} from './util';

export default function earth(): Object {
  return {

    imagery: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (options.hasOwnProperty('date') && !validateDate(options.date)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        return sendRequest(
          'api.nasa.gov',
          '/planetary/earth/imagery',
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    assets: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (options.hasOwnProperty('begin') && !validateDate(options.begin)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        if (options.hasOwnProperty('end') && !validateDate(options.end)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        return sendRequest(
          'api.nasa.gov',
          '/planetary/earth/assets',
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

  };
}
