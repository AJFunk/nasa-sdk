'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = apod;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function apod() {
  return {

    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('date') && !(0, _util.validateDate)(options.date)) {
          return reject(new Error('date must be in "YYYY-MM-DD" format'));
        }
        return (0, _util.sendRequest)('api.nasa.gov', '/planetary/apod', options, function (err, data) {
          if (err) return reject(err);
          return data ? resolve(data) : reject(new Error('No data found'));
        });
      });
    }

  };
}
module.exports = exports['default'];