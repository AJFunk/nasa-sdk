import Q from 'q';
import {
  sendRequest,
  validateDate,
} from './util';

export default function epic(): object {
  function validateType(type: string): string {
    const validTypes = ['natural', 'enhanced'];
    const i = validTypes.indexOf(type.toLowerCase());
    return i === -1 ? '' : validTypes[i];
  }

  function badRequest(message: string, deferred: object): undefined {
    deferred.reject(new Error(message));
    return deferred.promise;
  }

  return {

    fetch(type: string): undefined {
      const deferred = Q.defer();

      if (!type) return badRequest('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return badRequest('Invalid image quality type', deferred);

      sendRequest(`https://api.nasa.gov/EPIC/api/${validType}`, {}, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

    date(type: string, date: string): undefined {
      const deferred = Q.defer();

      if (!type) return badRequest('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return badRequest('Invalid image quality type', deferred);
      if (!date) return badRequest('date is required', deferred);
      if (!validateDate(date)) return badRequest('date must be in "YYYY-MM-DD" format', deferred);

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

      if (!type) return badRequest('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return badRequest('Invalid image quality type', deferred);

      sendRequest(`https://api.nasa.gov/EPIC/api/${type}/all`, {}, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

    available(type: string): undefined {
      const deferred = Q.defer();

      if (!type) return badRequest('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return badRequest('Invalid image quality type', deferred);

      sendRequest(`https://api.nasa.gov/EPIC/api/${type}/available`, {}, (err: string, data: object): undefined => {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

  };
}
