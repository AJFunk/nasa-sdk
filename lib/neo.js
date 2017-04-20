'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = neo;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseurl = 'api.nasa.gov';

var endpointbase = '/neo/rest/v1/';

function neo() {
  return {

    feed: function feed() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('start_date') && !(0, _util.validateDate)(options.start_date)) {
          return reject(new Error('start_date must be in "YYYY-MM-DD" format'));
        }
        if (options.hasOwnProperty('end_date') && !(0, _util.validateDate)(options.end_date)) {
          return reject(new Error('end_date must be in "YYYY-MM-DD" format'));
        }
        return (0, _util.sendRequest)(baseurl, endpointbase + 'feed', options, resolve, reject, _util.handleResult);
      });
    },

    feedToday: function feedToday() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)(baseurl, endpointbase + 'feed/today', options, resolve, reject, _util.handleResult);
      });
    },

    fetch: function fetch(asteroidId) {
      return new _promise2.default(function (resolve, reject) {
        if (!asteroidId) return reject(new Error('asteroidId is required'));
        return (0, _util.sendRequest)(baseurl, endpointbase + 'neo/' + asteroidId, {}, resolve, reject, _util.handleResult);
      });
    },

    browse: function browse() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)(baseurl, endpointbase + 'neo/browse', options, resolve, reject, _util.handleResult);
      });
    },

    stats: function stats() {
      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)(baseurl, endpointbase + 'stats', {}, resolve, reject, _util.handleResult);
      });
    }

  };
}
module.exports = exports['default'];