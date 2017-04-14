// @flow
import { sendRequest } from './util';

export default function eonet(): object {
  return {

    events(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        let endpoint = '/api/v2.1/events';
        if (options.hasOwnProperty('eventId')) endpoint = `${endpoint}/${options.eventId}`;
        return sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          endpoint,
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    categories(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        let endpoint = '/api/v2.1/categories';
        if (options.hasOwnProperty('categoryId')) endpoint = `${endpoint}/${options.categoryId}`;
        return sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          endpoint,
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    sources(): undefined {
      return new Promise((resolve: object, reject: object): undefined =>
        sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          '/api/v2.1/sources',
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        )
      );
    },

    layers(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        let endpoint = '/api/v2.1/layers';
        if (options.hasOwnProperty('categoryId')) endpoint = `${endpoint}/${options.categoryId}`;
        sendRequest(
          'eonet.sci.gsfc.nasa.gov',
          endpoint,
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

  };
}
