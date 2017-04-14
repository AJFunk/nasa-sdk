// @flow
import { sendRequest } from './util';

export default function scout(): Object {
  return {

    fetch: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          'ssd-api.jpl.nasa.gov',
          '/scout.api',
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          },
          true
        )
      ),

  };
}
