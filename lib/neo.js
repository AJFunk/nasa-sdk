'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = neo;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function neo() {
  return {
    feed: function feed() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();

      if (options.hasOwnProperty('start_date') && !(0, _util.validateDate)(options.start_date)) {
        return (0, _util.handleError)('start_date must be in "YYYY-MM-DD" format', deferred);
      }
      if (options.hasOwnProperty('end_date') && !(0, _util.validateDate)(options.end_date)) {
        return (0, _util.handleError)('end_date must be in "YYYY-MM-DD" format', deferred);
      }

      (0, _util.sendRequest)('https://api.nasa.gov/neo/rest/v1/feed', options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    feedToday: function feedToday() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();

      (0, _util.sendRequest)('https://api.nasa.gov/neo/rest/v1/feed/today', options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    fetch: function fetch(asteroidId) {
      var deferred = _q2.default.defer();

      if (!asteroidId) return (0, _util.handleError)('asteroidId is required', deferred);

      (0, _util.sendRequest)('https://api.nasa.gov/neo/rest/v1/neo/' + asteroidId, {}, function (err, data) {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    browse: function browse() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();

      (0, _util.sendRequest)('https://api.nasa.gov/neo/rest/v1/neo/browse', options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    stats: function stats() {
      var deferred = _q2.default.defer();

      (0, _util.sendRequest)('https://api.nasa.gov/neo/rest/v1/stats', {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];