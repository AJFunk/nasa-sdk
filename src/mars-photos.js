import Q from 'q';
import {
  sendRequest,
  validateDate,
} from './util';

export default function marsPhotos(): object {
  function validateRover(rover: string): string {
    const validRovers = ['curiosity', 'opportunity', 'spirit'];
    const i = validRovers.indexOf(rover.toLowerCase());
    return i === -1 ? '' : validRovers[i];
  }

  function validateCamera(rover: string, camera: string): string {
    const validCameras = {
      curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
      opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
      spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
    };
    const i = validCameras[rover].indexOf(camera.toLowerCase());
    return i === -1 ? '' : validCameras[rover][i];
  }

  return {

    fetch(rover: string, options: object = {}): undefined {
      const deferred = Q.defer();

      if (!rover) {
        deferred.reject(new Error('Rover name is required'));
        return deferred.promise;
      }
      const validRover = validateRover(rover);
      if (!validRover) {
        deferred.reject(new Error('Invalid rover name'));
        return deferred.promise;
      }

      let validCamera;
      if (options.hasOwnProperty('camera')) {
        validCamera = validateCamera(validRover, options.camera);
        if (!validCamera) {
          deferred.reject(new Error('Invalid camera name'));
          return deferred.promise;
        }
      }

      if (!options.hasOwnProperty('sol') && !options.hasOwnProperty('earth_date')) {
        deferred.reject(new Error('You must provide either earth_date or sol'));
        return deferred.promise;
      }

      if (options.hasOwnProperty('earth_date') && !validateDate(options.earth_date)) {
        deferred.reject(new Error('earth_date must be in "YYYY-MM-DD" format'));
        return deferred.promise;
      }

      sendRequest(`https://api.nasa.gov/mars-photos/api/v1/rovers/${validRover}/photos`,
        Object.assign({}, options, { camera: validCamera }),
        (err: string, data: object): undefined => {
          if (err) return deferred.reject(err);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    manifest(rover: string): undefined {
      const deferred = Q.defer();

      if (!rover) deferred.reject(new Error('Rover name is required'));
      const validRover = validateRover(rover);
      if (!validRover) deferred.reject(new Error('Invalid rover name'));

      sendRequest(`https://api.nasa.gov/mars-photos/api/v1/manifests/${validRover}`,
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
