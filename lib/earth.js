'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = earth;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function earth() {
  return {
    imagery: function imagery() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('date') && !(0, _util.validateDate)(options.date)) {
          return reject('date must be in "YYYY-MM-DD" format');
        }
        return (0, _util.sendRequest)('https://api.nasa.gov/planetary/earth/imagery', options, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    },
    assets: function assets() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('begin') && !(0, _util.validateDate)(options.begin)) {
          return reject('date must be in "YYYY-MM-DD" format');
        }
        if (options.hasOwnProperty('end') && !(0, _util.validateDate)(options.end)) {
          return reject('date must be in "YYYY-MM-DD" format');
        }
        return (0, _util.sendRequest)('https://api.nasa.gov/planetary/earth/assets', options, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
    }
  };
}
module.exports = exports['default'];