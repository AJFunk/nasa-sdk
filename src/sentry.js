import Q from 'q';
import {
  sendRequest,
  validateDate,
  validateDateTime,
  handleError,
} from './util';

export default function fireballs(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      if (options.hasOwnProperty('date-min')) {
        if (!validateDate(options['date-min']) && !validateDateTime(options['date-min'])) {
          return handleError('date-min is not in a valid format.', deferred);
        }
      }
      if (options.hasOwnProperty('date-max')) {
        if (!validateDate(options['date-max']) && !validateDateTime(options['date-max'])) {
          return handleError('date-max is not in a valid format.', deferred);
        }
      }
      sendRequest('https://ssd-api.jpl.nasa.gov/fireball.api',
        options,
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
