'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fireballs;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fireballs() {
  return {
    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      if (options.hasOwnProperty('date-min')) {
        if (!(0, _util.validateDate)(options['date-min']) && !(0, _util.validateDateTime)(options['date-min'])) {
          return (0, _util.handleError)('date-min is not in a valid format.', deferred);
        }
      }
      if (options.hasOwnProperty('date-max')) {
        if (!(0, _util.validateDate)(options['date-max']) && !(0, _util.validateDateTime)(options['date-max'])) {
          return (0, _util.handleError)('date-max is not in a valid format.', deferred);
        }
      }
      (0, _util.sendRequest)('https://ssd-api.jpl.nasa.gov/fireball.api', options, function (err, data) {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      }, true);
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];