import { sendRequest } from './util';

export default function patents(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest(
          'api.nasa.gov',
          '/patents/content',
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
