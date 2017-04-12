'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = neo;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function neo() {
  return {
    feed: function feed() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('start_date') && !(0, _util.validateDate)(options.start_date)) {
          return reject('start_date must be in "YYYY-MM-DD" format');
        }
        if (options.hasOwnProperty('end_date') && !(0, _util.validateDate)(options.end_date)) {
          return reject('end_date must be in "YYYY-MM-DD" format');
        }
        return (0, _util.sendRequest)('api.nasa.gov', '/neo/rest/v1/feed', options, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    },
    feedToday: function feedToday() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)('api.nasa.gov', '/neo/rest/v1/feed/today', options, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    },
    fetch: function fetch(asteroidId) {
      return new _promise2.default(function (resolve, reject) {
        if (!asteroidId) return reject('asteroidId is required');
        return (0, _util.sendRequest)('api.nasa.gov', '/neo/rest/v1/neo/' + asteroidId, {}, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    },
    browse: function browse() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)('api.nasa.gov', '/neo/rest/v1/neo/browse', options, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    },
    stats: function stats() {
      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)('api.nasa.gov', '/neo/rest/v1/stats', {}, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    }
  };
}
module.exports = exports['default'];