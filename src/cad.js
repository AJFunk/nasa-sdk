// @flow
import {
  sendRequest,
  validateDate,
  validateDateTime,
} from './util';

export default function cad(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        const optionOverrides = {};
        if (options.hasOwnProperty('date-min')) {
          if (!validateDate(options['date-min']) && !validateDateTime(options['date-min'])) {
            if (options['date-min'] !== 'now') {
              return reject(new Error('date-min is not in a valid format.'));
            }
          }
        }
        if (options.hasOwnProperty('date-max')) {
          if (!validateDate(options['date-max']) && !validateDateTime(options['date-max'])) {
            if (options['date-max'].match(/^[+]\d+$/)) {
              optionOverrides['date-max'] = options['date-max'].replace(/[+]/, '%2B');
            } else if (options['date-max'] !== 'now') {
              return reject(new Error('date-max is not in a valid format.'));
            }
          }
        }
        return sendRequest(
          'ssd-api.jpl.nasa.gov',
          '/cad.api',
          Object.assign({}, options, optionOverrides),
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          },
          true
        );
      });
    },

  };
}
