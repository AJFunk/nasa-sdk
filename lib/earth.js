'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = earth;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseurl = 'api.nasa.gov';

var endpointbase = '/planetary/earth/';

function earth() {
  return {

    imagery: function imagery() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('date') && !(0, _util.validateDate)(options.date)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        return (0, _util.sendRequest)(baseurl, endpointbase + 'imagery', options, resolve, reject, _util.handleResult);
      });
    },

    assets: function assets() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('begin') && !(0, _util.validateDate)(options.begin)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        if (options.hasOwnProperty('end') && !(0, _util.validateDate)(options.end)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        return (0, _util.sendRequest)(baseurl, endpointbase + 'assets', options, resolve, reject, _util.handleResult);
      });
    }

  };
}
module.exports = exports['default'];