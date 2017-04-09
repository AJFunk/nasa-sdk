import Q from 'q';
import {
  sendRequest,
  validateDate,
  validateColor,
} from './util';

export default function epic(): object {
  return {

    fetch(type: string): undefined {
      const deferred = Q.defer();
      if (type) {
        if (!validateColor(type)) deferred.reject(new Error('type must equal "natural||enhanced"'));
      } else deferred.reject(new Error('type is required'));
      sendRequest(`https://api.nasa.gov/EPIC/api/${type}`, {}, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

    date(type: string, date: string): undefined {
      const deferred = Q.defer();
      if (type && date) {
        if (!validateColor(type)) deferred.reject(new Error('type must equal "natural||enhanced"'));
        if (!validateDate(date)) deferred.reject(new Error('date must be in "YYYY-MM-DD" format'));
      } else deferred.reject(new Error('type and date are required'));
      sendRequest(`https://api.nasa.gov/EPIC/api/${type}/date/${date}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    all(type: string): undefined {
      const deferred = Q.defer();
      if (type) {
        if (!validateColor(type)) deferred.reject(new Error('type must equal "natural||enhanced"'));
      } else deferred.reject(new Error('color is required'));
      sendRequest(`https://api.nasa.gov/EPIC/api/${type}/all`, {}, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
  };
}
