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

function marsPhotos() {
  function validateRover(rover) {
    var validRovers = ['curiosity', 'opportunity', 'spirit'];
    var i = validRovers.indexOf(rover.toLowerCase());
    return i === -1 ? '' : validRovers[i];
  }

  function validateCamera(rover, camera) {
    var validCameras = {
      curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
      opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
      spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites']
    };
    var i = validCameras[rover].indexOf(camera.toLowerCase());
    return i === -1 ? '' : validCameras[rover][i];
  }

  return {
    fetch: function fetch(rover) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new _promise2.default(function (resolve, reject) {
        if (!rover) return reject('Rover name is required');
        var validRover = validateRover(rover);
        if (!validRover) return reject('Invalid rover name');
        var validCamera = void 0;
        if (options.hasOwnProperty('camera')) {
          validCamera = validateCamera(validRover, options.camera);
          if (!validCamera) return reject('Invalid camera name');
        }
        if (!options.hasOwnProperty('sol') && !options.hasOwnProperty('earth_date')) {
          return reject('You must provide either earth_date or sol');
        }
        if (options.hasOwnProperty('earth_date') && !(0, _util.validateDate)(options.earth_date)) {
          return reject('earth_date must be in "YYYY-MM-DD" format');
        }
        return (0, _util.sendRequest)('https://api.nasa.gov/mars-photos/api/v1/rovers/' + validRover + '/photos', (0, _assign2.default)({}, options, { camera: validCamera }), function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    },
    manifest: function manifest(rover) {
      return new _promise2.default(function (resolve, reject) {
        if (!rover) return reject('Rover name is required');
        var validRover = validateRover(rover);
        if (!validRover) return reject('Invalid rover name');
        return (0, _util.sendRequest)('https://api.nasa.gov/mars-photos/api/v1/manifests/' + validRover, {}, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    }
  };
}
module.exports = exports['default'];