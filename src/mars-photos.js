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
      return new Promise((resolve: object, reject: object): undefined => {
        if (!rover) return reject('Rover name is required');
        const validRover = validateRover(rover);
        if (!validRover) return reject('Invalid rover name');
        let validCamera;
        if (options.hasOwnProperty('camera')) {
          validCamera = validateCamera(validRover, options.camera);
          if (!validCamera) return reject('Invalid camera name');
        }
        if (!options.hasOwnProperty('sol') && !options.hasOwnProperty('earth_date')) {
          return reject('You must provide either earth_date or sol');
        }
        if (options.hasOwnProperty('earth_date') && !validateDate(options.earth_date)) {
          return reject('earth_date must be in "YYYY-MM-DD" format');
        }
        return sendRequest(`https://api.nasa.gov/mars-photos/api/v1/rovers/${validRover}/photos`,
          Object.assign({}, options, { camera: validCamera }),
          (err: string, data: object): undefined => {
            if (err) return reject(err);
            return resolve(data);
          }
        );
      });
    },

    manifest(rover: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!rover) return reject('Rover name is required');
        const validRover = validateRover(rover);
        if (!validRover) return reject('Invalid rover name');
        return sendRequest(`https://api.nasa.gov/mars-photos/api/v1/manifests/${validRover}`,
          {},
          (err: string, data: object): undefined => {
            if (err) return reject(err);
            return resolve(data);
          }
        );
      });
    },

  };
}
