import Q from 'q';
import {
  sendRequest,
  validateDate,
  handleError,
} from './util';

export default function earth(): object {
  return {

    imagery(options: object = {}): undefined {
      const deferred = Q.defer();
      if (options.hasOwnProperty('date') && !validateDate(options.date)) {
        return handleError('date must be in "YYYY-MM-DD" format', deferred);
      }
      sendRequest('https://api.nasa.gov/planetary/earth/imagery',
        options,
        (err: string, data: object): undefined => {
          if (err) return handleError(err, deferred);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    assets(options: object = {}): undefined {
      const deferred = Q.defer();
      if (options.hasOwnProperty('begin') && !validateDate(options.begin)) {
        return handleError('date must be in "YYYY-MM-DD" format', deferred);
      }
      if (options.hasOwnProperty('end') && !validateDate(options.end)) {
        return handleError('date must be in "YYYY-MM-DD" format', deferred);
      }
      sendRequest('https://api.nasa.gov/planetary/earth/assets',
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
