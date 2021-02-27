// @flow
import {
  handleResult,
  sendRequest,
  validateDate,
} from './util';
const baseurl = 'api.nasa.gov';
const endpointbase = '/mars-photos/api/v1/';

export default function marsPhotos(): Object {
  function validateRover(rover: string): string {
    const validRovers = ['curiosity', 'opportunity', 'spirit','perseverance'];
    const i = validRovers.indexOf(rover.toLowerCase());
    return i === -1 ? '' : validRovers[i];
  }

  function validateCamera(rover: string, camera: string): string {
    const validCameras = {
      curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
      opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
      spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
      perseverance: ['edl_rucam','edl_rdcam','edl_ddcam','edl_pucam1','edl_pucam2','navcam_left','navcam_right','mcz_right','mcz_left','front_hazcam_left_a','front_hazcam_right_a','rear_hazcam_left','rear_hazcam_right'],
    };
    const i = validCameras[rover].indexOf(camera.toLowerCase());
    return i === -1 ? '' : validCameras[rover][i];
  }

  return {

    fetch: (rover: string, options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!rover) return reject(new Error('Rover name is required'));
        const validRover = validateRover(rover);
        if (!validRover) return reject(new Error('Invalid rover name'));
        let validCamera;
        if (options.hasOwnProperty('camera')) {
          validCamera = validateCamera(validRover, options.camera);
          if (!validCamera) return reject(new Error('Invalid camera name'));
        }
        if (!options.hasOwnProperty('sol') && !options.hasOwnProperty('earth_date')) {
          return reject(new Error('You must provide either earth_date or sol'));
        }
        if (options.hasOwnProperty('earth_date') && !validateDate(options.earth_date)) {
          return reject(new Error('earth_date must be in "YYYY-MM-DD" format'));
        }
        return sendRequest(
          baseurl,
          `${endpointbase}rovers/${validRover}/photos`,
          Object.assign({}, options, { camera: validCamera }),
          resolve,
          reject,
          handleResult
        );
      }),

    manifest: (rover: string): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        if (!rover) return reject(new Error('Rover name is required'));
        const validRover = validateRover(rover);
        if (!validRover) return reject(new Error('Invalid rover name'));
        return sendRequest(
          baseurl,
          `${endpointbase}manifests/${validRover}`,
          {},
          resolve,
          reject,
          handleResult
        );
      }),

  };
}
