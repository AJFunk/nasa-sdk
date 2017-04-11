import Q from 'q';
import {
  sendRequest,
  validateDate,
  validateDateTime,
} from './util';

export default function cad(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      const optionOverrides = {};
      if (options.hasOwnProperty('date-min')) {
        if (!validateDate(options['date-min']) && !validateDateTime(options['date-min'])) {
          if (options['date-min'] !== 'now') {
            deferred.reject(new Error('date-min is not in a valid format.'));
            return deferred.promise;
          }
        }
      }
      if (options.hasOwnProperty('date-max')) {
        if (!validateDate(options['date-max']) && !validateDateTime(options['date-max'])) {
          if (options['date-max'].match(/^[+]\d+$/)) {
            optionOverrides['date-max'] = options['date-max'].replace(/[+]/, '%2B');
          } else if (options['date-max'] !== 'now') {
            deferred.reject(new Error('date-max is not in a valid format.'));
            return deferred.promise;
          }
        }
      }
      sendRequest('https://ssd-api.jpl.nasa.gov/cad.api',
        Object.assign({}, options, optionOverrides),
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        },
        true
      );
      return deferred.promise;
    },

  };
}
