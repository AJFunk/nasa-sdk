import {
  sendRequest,
  validateDate,
  validateDateTime,
} from './util';

export default function fireballs(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
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
