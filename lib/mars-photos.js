'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = marsPhotos;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

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

      var deferred = _q2.default.defer();

      if (!rover) {
        deferred.reject(new Error('Rover name is required'));
        return deferred.promise;
      }
      var validRover = validateRover(rover);
      if (!validRover) {
        deferred.reject(new Error('Invalid rover name'));
        return deferred.promise;
      }

      var validCamera = void 0;
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

      if (options.hasOwnProperty('earth_date') && !(0, _util.validateDate)(options.earth_date)) {
        deferred.reject(new Error('earth_date must be in "YYYY-MM-DD" format'));
        return deferred.promise;
      }

      (0, _util.sendRequest)('https://api.nasa.gov/mars-photos/api/v1/rovers/' + validRover + '/photos', Object.assign({}, options, { camera: validCamera }), function (err, data) {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    manifest: function manifest(rover) {
      var deferred = _q2.default.defer();

      if (!rover) deferred.reject(new Error('Rover name is required'));
      var validRover = validateRover(rover);
      if (!validRover) deferred.reject(new Error('Invalid rover name'));

      (0, _util.sendRequest)('https://api.nasa.gov/mars-photos/api/v1/manifests/' + validRover, {}, function (err, data) {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];