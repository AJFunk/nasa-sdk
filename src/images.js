// @flow
import {
  handleResult,
  sendRequest,
} from './util';

export default function images(): Object {
  const baseurl = 'images-api.nasa.gov';

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
          return reject(new Error('Atleast one search param is required'));
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
          baseurl,
          '/search',
          options,
          resolve,
          reject,
          handleResult,
          true
        );
      }),

    asset: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseurl,
          `/asset/${nasaId}`,
          {},
          resolve,
          reject,
          handleResult,
          true
        );
      }),

    metadata: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseurl,
          `/metadata/${nasaId}`,
          {},
          resolve,
          reject,
          handleResult,
          true
        );
      }),

    captions: (nasaId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return sendRequest(
          baseurl,
          `/captions/${nasaId}`,
          {},
          resolve,
          reject,
          handleResult,
          true,
        );
      }),

  };
}
