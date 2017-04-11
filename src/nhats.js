import { sendRequest } from './util';

export default function nhats(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest('https://ssd-api.jpl.nasa.gov/nhats.api',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(err);
            return resolve(data);
          },
          true
        )
      );
    },

  };
}
