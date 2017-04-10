import Q from 'q';
import {
  sendRequest,
  validateDate,
} from './util';

export default function apod(): object {
  return {

    fetch(options: object = {}): undefined {
      const deferred = Q.defer();
      if (options.hasOwnProperty('date') && !validateDate(options.date)) {
        deferred.reject(new Error('date must be in "YYYY-MM-DD" format'));
        return deferred.promise;
      }
      sendRequest('https://api.nasa.gov/planetary/apod', options, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

  };
}
