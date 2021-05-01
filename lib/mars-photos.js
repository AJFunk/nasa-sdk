'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = marsPhotos;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseurl = 'api.nasa.gov';

var endpointbase = '/mars-photos/api/v1/';

function marsPhotos() {
  function validateRover(rover) {
    var validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
    var i = validRovers.indexOf(rover.toLowerCase());
    return i === -1 ? '' : validRovers[i];
  }

  function validateCamera(rover, camera) {
    var validCameras = {
      curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
      opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
      spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
      perseverance: ['edl_rucam', 'edl_rdcam', 'edl_ddcam', 'edl_pucam1', 'edl_pucam2', 'navcam_left', 'navcam_right', 'mcz_right', 'mcz_left', 'front_hazcam_left_a', 'front_hazcam_right_a', 'rear_hazcam_left', 'rear_hazcam_right', 'skycam', 'sherloc_watson']
    };
    var i = validCameras[rover].indexOf(camera.toLowerCase());
    return i === -1 ? '' : validCameras[rover][i];
  }

  return {

    fetch: function fetch(rover) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new _promise2.default(function (resolve, reject) {
        if (!rover) return reject(new Error('Rover name is required'));
        var validRover = validateRover(rover);
        if (!validRover) return reject(new Error('Invalid rover name'));
        var validCamera = void 0;
        if (options.hasOwnProperty('camera')) {
          validCamera = validateCamera(validRover, options.camera);
          if (!validCamera) return reject(new Error('Invalid camera name'));
        }
        if (!options.hasOwnProperty('sol') && !options.hasOwnProperty('earth_date')) {
          return reject(new Error('You must provide either earth_date or sol'));
        }
        if (options.hasOwnProperty('earth_date') && !(0, _util.validateDate)(options.earth_date)) {
          return reject(new Error('earth_date must be in "YYYY-MM-DD" format'));
        }
        return (0, _util.sendRequest)(baseurl, endpointbase + 'rovers/' + validRover + '/photos', (0, _assign2.default)({}, options, { camera: validCamera }), resolve, reject, _util.handleResult);
      });
    },

    manifest: function manifest(rover) {
      return new _promise2.default(function (resolve, reject) {
        if (!rover) return reject(new Error('Rover name is required'));
        var validRover = validateRover(rover);
        if (!validRover) return reject(new Error('Invalid rover name'));
        return (0, _util.sendRequest)(baseurl, endpointbase + 'manifests/' + validRover, {}, resolve, reject, _util.handleResult);
      });
    }

  };
}
module.exports = exports['default'];