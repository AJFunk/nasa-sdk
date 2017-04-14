// @flow
import { sendRequest } from './util';

export default function nhats(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest(
          'ssd-api.jpl.nasa.gov',
          '/nhats.api',
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          },
          true
        )
      );
    },

  };
}
