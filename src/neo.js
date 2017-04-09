import Q from 'q';
import { sendRequest } from './util';

export default function neo(): object {
  return {

    feed(options: object = {}): undefined {
      const deferred = Q.defer();
      // TODO: check for options.start_date since it's required
      // validate YYYY-MM-DD format for start_date and end_date
      sendRequest('https://api.nasa.gov/neo/rest/v1/feed',
        options,
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
