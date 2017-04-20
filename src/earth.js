// @flow
import {
  handleResult,
  sendRequest,
  validateDate,
} from './util';
const baseurl = 'api.nasa.gov';

export default function earth(): Object {
  return {

    imagery: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (options.hasOwnProperty('date') && !validateDate(options.date)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        return sendRequest(
          baseurl,
          '/planetary/earth/imagery',
          options,
          resolve,
          reject,
          handleResult
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
          baseurl,
          '/planetary/earth/assets',
          options,
          resolve,
          reject,
          handleResult
        );
      }),

  };
}
