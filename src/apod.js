import {
  sendRequest,
  validateDate,
} from './util';

export default function apod(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (options.hasOwnProperty('date') && !validateDate(options.date)) {
          return reject('date must be in "YYYY-MM-DD" format');
        }
        return sendRequest(
          'api.nasa.gov',
          '/planetary/apod',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(err);
            return resolve(data);
          }
        );
      });
    },

  };
}
