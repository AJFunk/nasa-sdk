import Q from 'q';
import {
  sendRequest,
  validateDate,
} from './util';

export default function earth(): object {
  return {

    imagery(options: object = {}): undefined {
      const deferred = Q.defer();
      if (options.hasOwnProperty('date') && !validateDate(options.date)) {
        deferred.reject(new Error('date must be in "YYYY-MM-DD" format'));
        return deferred.promise;
      }
      sendRequest('https://api.nasa.gov/planetary/earth/imagery',
        options,
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    assets(options: object = {}): undefined {
      const deferred = Q.defer();
      if (options.hasOwnProperty('begin') && !validateDate(options.begin)) {
        deferred.reject(new Error('begin must be in "YYYY-MM-DD" format'));
        return deferred.promise;
      }
      if (options.hasOwnProperty('end') && !validateDate(options.end)) {
        deferred.reject(new Error('end must be in "YYYY-MM-DD" format'));
        return deferred.promise;
      }
      sendRequest('https://api.nasa.gov/planetary/earth/assets',
        options,
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
