// @flow
import {
  handleResult,
  sendRequest,
} from './util';

export default function patents(): Object {
  return {

    fetch: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          'api.nasa.gov',
          '/patents/content',
          options,
          resolve,
          reject,
          handleResult
        )
      ),

  };
}
