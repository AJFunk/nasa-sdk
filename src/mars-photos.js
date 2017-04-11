import Q from 'q';
import {
  sendRequest,
  validateDate,
  handleError,
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

      if (!rover) return handleError('Rover name is required', deferred);
      const validRover = validateRover(rover);
      if (!validRover) return handleError('Invalid rover name', deferred);

      let validCamera;
      if (options.hasOwnProperty('camera')) {
        validCamera = validateCamera(validRover, options.camera);
        if (!validCamera) return handleError('Invalid camera name', deferred);
      }

      if (!options.hasOwnProperty('sol') && !options.hasOwnProperty('earth_date')) {
        return handleError('You must provide either earth_date or sol', deferred);
      }

      if (options.hasOwnProperty('earth_date') && !validateDate(options.earth_date)) {
        return handleError('earth_date must be in "YYYY-MM-DD" format', deferred);
      }

      sendRequest(`https://api.nasa.gov/mars-photos/api/v1/rovers/${validRover}/photos`,
        Object.assign({}, options, { camera: validCamera }),
        (err: string, data: object): undefined => {
          if (err) return handleError(err, deferred);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

    manifest(rover: string): undefined {
      const deferred = Q.defer();

      if (!rover) return handleError('Rover name is required', deferred);
      const validRover = validateRover(rover);
      if (!validRover) return handleError('Invalid rover name', deferred);

      sendRequest(`https://api.nasa.gov/mars-photos/api/v1/manifests/${validRover}`,
        {},
        (err: string, data: object): undefined => {
          if (err) return handleError(err, deferred);
          return deferred.resolve(data);
        }
      );
      return deferred.promise;
    },

  };
}
