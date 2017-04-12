import { sendRequest } from './util';

export default function sentry(): object {
  return {

    fetch(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest(
          'ssd-api.jpl.nasa.gov',
          '/sentry.api',
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
