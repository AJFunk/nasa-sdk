import Q from 'q';
import {
  sendRequest,
  validateDate,
  validateColor,
} from './util';

export default function epic(): object {
  return {

    fetch(color: string): undefined {
      const deferred = Q.defer();
      if (!color) deferred.reject(new Error('color is required'));
      if (color && !validateColor(color)) {
        deferred.reject(new Error('color must equal "natural" or "enhanced"'));
      }
      sendRequest(`https://api.nasa.gov/EPIC/api/${color}`, {}, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

    date(color: string, date: string): undefined {
      const deferred = Q.defer();
      if (!color) deferred.reject(new Error('color is required'));
      if (!date) deferred.reject(new Error('date is required'));
      if (color && !validateColor(color)) {
        deferred.reject(new Error('color must equal "natural" or "enhanced"'));
      }
      if (date && !validateDate(date)) {
        deferred.reject(new Error('date must be in "YYYY-MM-DD" format'));
      }
      sendRequest(`https://api.nasa.gov/EPIC/api/${color}/date/${date}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
