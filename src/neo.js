// @flow
import {
  handleResult,
  sendRequest,
  validateDate,
} from './util';
const baseurl = 'api.nasa.gov';
const endpointbase = '/neo/rest/v1/';

export default function neo(): Object {
  return {

    feed: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (options.hasOwnProperty('start_date') && !validateDate(options.start_date)) {
          return reject(new Error('start_date must be in "YYYY-MM-DD" format'));
        }
        if (options.hasOwnProperty('end_date') && !validateDate(options.end_date)) {
          return reject(new Error('end_date must be in "YYYY-MM-DD" format'));
        }
        return sendRequest(
          baseurl,
          `${endpointbase}feed`,
          options,
          resolve,
          reject,
          handleResult
        );
      }),

    feedToday: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          baseurl,
          `${endpointbase}feed/today`,
          options,
          resolve,
          reject,
          handleResult
        )
      ),

    fetch: (asteroidId: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!asteroidId) return reject(new Error('asteroidId is required'));
        return sendRequest(
          baseurl,
          `${endpointbase}neo/${asteroidId}`,
          {},
          resolve,
          reject,
          handleResult
        );
      }),

    browse: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          baseurl,
          `${endpointbase}neo/browse`,
          options,
          resolve,
          reject,
          handleResult
        )
      ),

    stats: (): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          baseurl,
          `${endpointbase}stats`,
          {},
          resolve,
          reject,
          handleResult
        )
      ),

  };
}
