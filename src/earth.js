import {
  sendRequest,
  validateDate,
} from './util';

export default function earth(): object {
  return {

    imagery(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (options.hasOwnProperty('date') && !validateDate(options.date)) {
          return reject('date must be in "YYYY-MM-DD" format');
        }
        return sendRequest('https://api.nasa.gov/planetary/earth/imagery',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(err);
            return resolve(data);
          }
        );
      });
    },

    assets(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (options.hasOwnProperty('begin') && !validateDate(options.begin)) {
          return reject('date must be in "YYYY-MM-DD" format');
        }
        if (options.hasOwnProperty('end') && !validateDate(options.end)) {
          return reject('date must be in "YYYY-MM-DD" format');
        }
        return sendRequest('https://api.nasa.gov/planetary/earth/assets',
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
