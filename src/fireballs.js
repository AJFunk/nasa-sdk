// @flow
import {
  handleResult,
  sendRequest,
  validateDate,
  validateDateTime,
} from './util';

export default function fireballs(): Object {
  return {

    fetch: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (options.hasOwnProperty('date-min')) {
          if (!validateDate(options['date-min']) && !validateDateTime(options['date-min'])) {
            return reject(new Error('date-min is not in a valid format.'));
          }
        }
        if (options.hasOwnProperty('date-max')) {
          if (!validateDate(options['date-max']) && !validateDateTime(options['date-max'])) {
            return reject(new Error('date-max is not in a valid format.'));
          }
        }
        return sendRequest(
          'ssd-api.jpl.nasa.gov',
          '/fireball.api',
          options,
          resolve,
          reject,
          handleResult,
          true
        );
      }),

  };
}
