'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apod;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function apod() {
  return {
    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      if (options.hasOwnProperty('date') && !(0, _util.validateDate)(options.date)) {
        deferred.reject(new Error('date must be in "YYYY-MM-DD" format'));
        return deferred.promise;
      }
      (0, _util.sendRequest)('https://api.nasa.gov/planetary/apod', options, function (err, data) {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];