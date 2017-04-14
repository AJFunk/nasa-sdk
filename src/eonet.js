// @flow
import { sendRequest } from './util';

export default function eonet(): Object {
  return {

    events: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        let endpoint = '/api/v2.1/events';
        if (options.hasOwnProperty('eventId')) endpoint = `${endpoint}/${options.eventId}`;
        return sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          endpoint,
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    categories: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        let endpoint = '/api/v2.1/categories';
        if (options.hasOwnProperty('categoryId')) endpoint = `${endpoint}/${options.categoryId}`;
        return sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          endpoint,
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    sources: (): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          '/api/v2.1/sources',
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        )
      ),

    layers: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        let endpoint = '/api/v2.1/layers';
        if (options.hasOwnProperty('categoryId')) endpoint = `${endpoint}/${options.categoryId}`;
        return sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          endpoint,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

  };
}
