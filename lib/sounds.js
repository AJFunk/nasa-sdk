'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sounds;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sounds() {
  return {
    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();

      (0, _util.sendRequest)('https://api.nasa.gov/planetary/sounds', options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];