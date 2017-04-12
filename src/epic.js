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

  return {

    fetch(type: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return sendRequest(
          'api.nasa.gov',
          `/EPIC/api/${validType}`,
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    date(type: string, date: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        if (!date) return reject(new Error('date is required'));
        if (!validateDate(date)) return reject(new Error('date must be in "YYYY-MM-DD" format'));
        return sendRequest(
          'api.nasa.gov',
          `/EPIC/api/${type}/date/${date}`,
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    all(type: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return sendRequest(
          'api.nasa.gov',
          `/EPIC/api/${type}/all`,
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    available(type: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!type) return reject(new Error('Image quality type is required'));
        const validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return sendRequest(
          'api.nasa.gov',
          `/EPIC/api/${type}/available`,
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

  };
}
