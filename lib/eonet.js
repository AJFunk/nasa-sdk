'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = eonet;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseurl = 'eonet.sci.gsfc.nasa.gov';

var endpointbase = '/api/v2.1/';

function eonet() {
  return {

    events: function events() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        var endpoint = endpointbase + 'events';
        if (options.hasOwnProperty('eventId')) endpoint = endpoint + '/' + options.eventId;
        return (0, _util.sendRequest)(baseurl, endpoint, options, resolve, reject, _util.handleResult);
      });
    },

    categories: function categories() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        var endpoint = endpointbase + 'categories';
        if (options.hasOwnProperty('categoryId')) endpoint = endpoint + '/' + options.categoryId;
        return (0, _util.sendRequest)(baseurl, endpoint, options, resolve, reject, _util.handleResult);
      });
    },

    sources: function sources() {
      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)(baseurl, endpointbase + 'sources', {}, resolve, reject, _util.handleResult);
      });
    },

    layers: function layers() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        var endpoint = endpointbase + 'layers';
        if (options.hasOwnProperty('categoryId')) endpoint = endpoint + '/' + options.categoryId;
        return (0, _util.sendRequest)(baseurl, endpoint, {}, resolve, reject, _util.handleResult);
      });
    }

  };
}
module.exports = exports['default'];