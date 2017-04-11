'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = fireballs;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fireballs() {
  return {
    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        if (options.hasOwnProperty('date-min')) {
          if (!(0, _util.validateDate)(options['date-min']) && !(0, _util.validateDateTime)(options['date-min'])) {
            return reject('date-min is not in a valid format.');
          }
        }
        if (options.hasOwnProperty('date-max')) {
          if (!(0, _util.validateDate)(options['date-max']) && !(0, _util.validateDateTime)(options['date-max'])) {
            return reject('date-max is not in a valid format.');
          }
        }
        return (0, _util.sendRequest)('https://ssd-api.jpl.nasa.gov/fireball.api', options, function (err, data) {
          if (err) return reject(err);
          return resolve(data);
        }, true);
      });
    }
  };
}
module.exports = exports['default'];