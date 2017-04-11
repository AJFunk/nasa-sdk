import Q from 'q';
import {
  sendRequest,
  validateDate,
  handleError,
} from './util';

export default function apod(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      if (options.hasOwnProperty('date') && !validateDate(options.date)) {
        handleError('date must be in "YYYY-MM-DD" format', deferred);
      }
      sendRequest('https://api.nasa.gov/planetary/apod',
        options,
        (err: string, data: object): undefined => {
          if (err) return handleError(err, deferred);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
