// @flow
import {
  handleResult,
  sendRequest,
} from './util';

export default function sentry(): Object {
  return {

    fetch: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          'ssd-api.jpl.nasa.gov',
          '/sentry.api',
          options,
          resolve,
          reject,
          handleResult,
          true
        )
      ),

  };
}
