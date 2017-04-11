import Q from 'q';
import {
  sendRequest,
  validateDate,
  handleError,
} from './util';

export default function epic(): object {
  function validateType(type: string): string {
    const validTypes = ['natural', 'enhanced'];
    const i = validTypes.indexOf(type.toLowerCase());
    return i === -1 ? '' : validTypes[i];
  }

  return {

    fetch(type: string): undefined {
      const deferred = Q.defer();

      if (!type) return handleError('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return handleError('Invalid image quality type', deferred);

      sendRequest(`https://api.nasa.gov/EPIC/api/${validType}`, {}, (err: string, data: object): undefined => {
        if (err) return handleError(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

    date(type: string, date: string): undefined {
      const deferred = Q.defer();

      if (!type) return handleError('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return handleError('Invalid image quality type', deferred);
      if (!date) return handleError('date is required', deferred);
      if (!validateDate(date)) return handleError('date must be in "YYYY-MM-DD" format', deferred);

      sendRequest(`https://api.nasa.gov/EPIC/api/${type}/date/${date}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return handleError(err, deferred);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    all(type: string): undefined {
      const deferred = Q.defer();

      if (!type) return handleError('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return handleError('Invalid image quality type', deferred);

      sendRequest(`https://api.nasa.gov/EPIC/api/${type}/all`, {}, (err: string, data: object): undefined => {
        if (err) return handleError(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

    available(type: string): undefined {
      const deferred = Q.defer();

      if (!type) return handleError('Image quality type is required', deferred);
      const validType = validateType(type);
      if (!validType) return handleError('Invalid image quality type', deferred);

      sendRequest(`https://api.nasa.gov/EPIC/api/${type}/available`, {}, (err: string, data: object): undefined => {
        if (err) return handleError(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },

  };
}
