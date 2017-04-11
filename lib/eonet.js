'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eonet;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eonet() {
  return {
    events: function events() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      var endpoint = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events';
      if (options.hasOwnProperty('eventId')) endpoint = endpoint + '/' + options.eventId;
      (0, _util.sendRequest)(endpoint, options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    categories: function categories() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      var endpoint = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories';
      if (options.hasOwnProperty('categoryId')) endpoint = endpoint + '/' + options.categoryId;
      (0, _util.sendRequest)(endpoint, options, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    sources: function sources() {
      var deferred = _q2.default.defer();
      (0, _util.sendRequest)('https://eonet.sci.gsfc.nasa.gov/api/v2.1/sources', {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    layers: function layers() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      var endpoint = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/layers';
      if (options.hasOwnProperty('categoryId')) endpoint = endpoint + '/' + options.categoryId;
      (0, _util.sendRequest)(endpoint, {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];