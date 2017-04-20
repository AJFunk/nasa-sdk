'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseurl = 'api.nasa.gov';

var endpointbase = '/EPIC/api/';

function epic() {
  function validateType(type) {
    var validTypes = ['natural', 'enhanced'];
    var i = validTypes.indexOf(type.toLowerCase());
    return i === -1 ? '' : validTypes[i];
  }

  return {

    fetch: function fetch(type) {
      return new _promise2.default(function (resolve, reject) {
        if (!type) return reject(new Error('Image quality type is required'));
        var validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return (0, _util.sendRequest)(baseurl, '' + endpointbase + validType, {}, resolve, reject, _util.handleResult);
      });
    },

    date: function date(type, _date) {
      return new _promise2.default(function (resolve, reject) {
        if (!type) return reject(new Error('Image quality type is required'));
        var validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        if (!_date) return reject(new Error('date is required'));
        if (!(0, _util.validateDate)(_date)) return reject(new Error('date must be in "YYYY-MM-DD" format'));
        return (0, _util.sendRequest)(baseurl, '' + endpointbase + type + '/date/' + _date, {}, resolve, reject, _util.handleResult);
      });
    },

    all: function all(type) {
      return new _promise2.default(function (resolve, reject) {
        if (!type) return reject(new Error('Image quality type is required'));
        var validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return (0, _util.sendRequest)(baseurl, '' + endpointbase + type + '/all', {}, resolve, reject, _util.handleResult);
      });
    },

    available: function available(type) {
      return new _promise2.default(function (resolve, reject) {
        if (!type) return reject(new Error('Image quality type is required'));
        var validType = validateType(type);
        if (!validType) return reject(new Error('Invalid image quality type'));
        return (0, _util.sendRequest)(baseurl, '' + endpointbase + type + '/available', {}, resolve, reject, _util.handleResult);
      });
    }

  };
}
exports.default = epic;
module.exports = exports['default'];