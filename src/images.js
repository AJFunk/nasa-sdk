// @flow
import { sendRequest } from './util';

export default function images(): Object {
  const baseUrl = 'images-api.nasa.gov';
  const endpoints = {
    search: '/search',
    asset: '/asset',
    metadata: '/metadata',
    captions: '/captions',
  };

  function validateMediaType(mediaType: string): string {
    const validMediaTypes = ['image', 'audio'];
    const i = validMediaTypes.indexOf(mediaType.toLowerCase());
    return i === -1 ? '' : validMediaTypes[i];
  }

  function validateYear(year: string): boolean {
    if (!year || typeof year !== 'string') return false;
    return year.match(/^\d{4}$/) !== null;
  }

  return {

    search: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (Object.keys(options).length === 0) {
          return reject(new Error('Expected "q" text search parameter or other keywords'));
        }
        if (options.hasOwnProperty('mediaType') && !validateMediaType(options.mediaType)) {
          return reject(new Error('mediaType values must match "image" or "audio"'));
        }
        if (options.hasOwnProperty('yearStart') && !validateYear(options.yearStart)) {
          return reject(new Error('yearStart must be in "YYYY" format'));
        }
        if (options.hasOwnProperty('yearEnd') && !validateYear(options.yearEnd)) {
          return reject(new Error('yearEnd must be in "YYYY" format'));
        }
        return sendRequest(
          baseUrl,
          endpoints.search,
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    asset: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseUrl,
          endpoints.asset,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    metadata: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseUrl,
          endpoints.metadata,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

    captions: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseUrl,
          endpoints.captions,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          }
        );
      }),

  };
}
