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

      if (!rover) return (0, _util.handleError)('Rover name is required', deferred);
      var validRover = validateRover(rover);
      if (!validRover) return (0, _util.handleError)('Invalid rover name', deferred);

      var validCamera = void 0;
      if (options.hasOwnProperty('camera')) {
        validCamera = validateCamera(validRover, options.camera);
        if (!validCamera) return (0, _util.handleError)('Invalid camera name', deferred);
      }

      if (!options.hasOwnProperty('sol') && !options.hasOwnProperty('earth_date')) {
        return (0, _util.handleError)('You must provide either earth_date or sol', deferred);
      }

      if (options.hasOwnProperty('earth_date') && !(0, _util.validateDate)(options.earth_date)) {
        return (0, _util.handleError)('earth_date must be in "YYYY-MM-DD" format', deferred);
      }

      (0, _util.sendRequest)('https://api.nasa.gov/mars-photos/api/v1/rovers/' + validRover + '/photos', Object.assign({}, options, { camera: validCamera }), function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    manifest: function manifest(rover) {
      var deferred = _q2.default.defer();

      if (!rover) return (0, _util.handleError)('Rover name is required', deferred);
      var validRover = validateRover(rover);
      if (!validRover) return (0, _util.handleError)('Invalid rover name', deferred);

      (0, _util.sendRequest)('https://api.nasa.gov/mars-photos/api/v1/manifests/' + validRover, {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];