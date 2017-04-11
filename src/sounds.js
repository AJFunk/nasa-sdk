import { sendRequest } from './util';

export default function sounds(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest('https://api.nasa.gov/planetary/sounds',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(err);
            return resolve(data);
          }
        )
      );
    },

  };
}
