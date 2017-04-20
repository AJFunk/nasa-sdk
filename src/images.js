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
        if (options.hasOwnProperty('media_type') && !validateMediaType(options.media_type)) {
          return reject(new Error('media_type values must match "image" or "audio"'));
        }
        if (options.hasOwnProperty('year_start') && !validateYear(options.year_start)) {
          return reject(new Error('year_start must be in "YYYY" format'));
        }
        if (options.hasOwnProperty('year_end') && !validateYear(options.year_end)) {
          return reject(new Error('year_end must be in "YYYY" format'));
        }
        return sendRequest(
          baseUrl,
          endpoints.search,
          options,
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          },
          true
        );
      }),

    asset: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseUrl,
          `${endpoints.asset}/${nasaId}`,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          },
          true
        );
      }),

    metadata: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseUrl,
          `${endpoints.metadata}/${nasaId}`,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          },
          true
        );
      }),

    captions: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseUrl,
          `${endpoints.captions}/${nasaId}`,
          {},
          (err: Error | null, data?: Object): mixed => {
            if (err) return reject(err);
            return data ? resolve(data) : reject(new Error('No data found'));
          },
          true
        );
      }),

  };
}
