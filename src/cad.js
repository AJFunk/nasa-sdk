import Q from 'q';
import {
  sendRequest,
  validateDate,
  validateDateTime,
  handleError,
} from './util';

export default function cad(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      const optionOverrides = {};
      if (options.hasOwnProperty('date-min')) {
        if (!validateDate(options['date-min']) && !validateDateTime(options['date-min'])) {
          if (options['date-min'] !== 'now') {
            return handleError('date-min is not in a valid format.', deferred);
          }
        }
      }
      if (options.hasOwnProperty('date-max')) {
        if (!validateDate(options['date-max']) && !validateDateTime(options['date-max'])) {
          if (options['date-max'].match(/^[+]\d+$/)) {
            optionOverrides['date-max'] = options['date-max'].replace(/[+]/, '%2B');
          } else if (options['date-max'] !== 'now') {
            return handleError('date-max is not in a valid format.', deferred);
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
