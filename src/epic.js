import Q from 'q';
import { sendRequest } from './util';

export default function epic(): object {
  return {

    natural(urlParam: string = ''): undefined {
      const deferred = Q.defer();
      sendRequest(`epic/api/natural/${urlParam}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    enhanced(urlParam: string = ''): undefined {
      const deferred = Q.defer();
      sendRequest(`epic/api/enhanced/${urlParam}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
