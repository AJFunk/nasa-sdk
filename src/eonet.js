// @flow
import {
  handleResult,
  sendRequest,
} from './util';
const baseurl = 'eonet.sci.gsfc.nasa.gov';
const endpointbase = '/api/v2.1/';

export default function eonet(): Object {
  return {

    events: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        let endpoint = `${endpointbase}events`;
        if (options.hasOwnProperty('eventId')) endpoint = `${endpoint}/${options.eventId}`;
        return sendRequest(
          baseurl,
          endpoint,
          options,
          resolve,
          reject,
          handleResult
        );
      }),

    categories: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        let endpoint = `${endpointbase}categories`;
        if (options.hasOwnProperty('categoryId')) endpoint = `${endpoint}/${options.categoryId}`;
        return sendRequest(
          baseurl,
          endpoint,
          options,
          resolve,
          reject,
          handleResult
        );
      }),

    sources: (): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed =>
        sendRequest(
          baseurl,
          `${endpointbase}sources`,
          {},
          resolve,
          reject,
          handleResult
        )
      ),

    layers: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        let endpoint = `${endpointbase}layers`;
        if (options.hasOwnProperty('categoryId')) endpoint = `${endpoint}/${options.categoryId}`;
        return sendRequest(
          baseurl,
          endpoint,
          {},
          resolve,
          reject,
          handleResult
        );
      }),

  };
}
