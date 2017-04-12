'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = eonet;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eonet() {
  return {
    events: function events() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        var endpoint = '/api/v2.1/events';
        if (options.hasOwnProperty('eventId')) endpoint = endpoint + '/' + options.eventId;
        return (0, _util.sendRequest)('eonet.sci.gsfc.nasa.gov', endpoint, options, function (err, data) {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },
    categories: function categories() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        var endpoint = '/api/v2.1/categories';
        if (options.hasOwnProperty('categoryId')) endpoint = endpoint + '/' + options.categoryId;
        return (0, _util.sendRequest)('eonet.sci.gsfc.nasa.gov', endpoint, options, function (err, data) {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },
    sources: function sources() {
      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)('eonet.sci.gsfc.nasa.gov', '/api/v2.1/sources', {}, function (err, data) {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },
    layers: function layers() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        var endpoint = '/api/v2.1/layers';
        if (options.hasOwnProperty('categoryId')) endpoint = endpoint + '/' + options.categoryId;
        (0, _util.sendRequest)('eonet.sci.gsfc.nasa.gov', endpoint, {}, function (err, data) {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    }
  };
}
module.exports = exports['default'];