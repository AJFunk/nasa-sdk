'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = earth;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function earth() {
  return {
    imagery: function imagery() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      if (options.hasOwnProperty('date') && !(0, _util.validateDate)(options.date)) {
        return (0, _util.handleError)('date must be in "YYYY-MM-DD" format', deferred);
      }
      (0, _util.sendRequest)('https://api.nasa.gov/planetary/earth/imagery', options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    assets: function assets() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      if (options.hasOwnProperty('begin') && !(0, _util.validateDate)(options.begin)) {
        return (0, _util.handleError)('date must be in "YYYY-MM-DD" format', deferred);
      }
      if (options.hasOwnProperty('end') && !(0, _util.validateDate)(options.end)) {
        return (0, _util.handleError)('date must be in "YYYY-MM-DD" format', deferred);
      }
      (0, _util.sendRequest)('https://api.nasa.gov/planetary/earth/assets', options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];