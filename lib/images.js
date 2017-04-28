'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = images;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function images() {
  var baseurl = 'images-api.nasa.gov';

  function validateMediaType(mediaType) {
    if (!mediaType || typeof mediaType !== 'string') return false;
    return mediaType.match(/^image$|^audio$|^image,audio$|^audio,image$/) !== null;
  }

  function validateYear(year) {
    if (!year || typeof year !== 'string') return false;
    return year.match(/^\d{4}$/) !== null;
  }

  return {

    search: function search() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _promise2.default(function (resolve, reject) {
        if (!(0, _keys2.default)(options).length) {
          return reject(new Error('Atleast one search param is required'));
        }
        if (options.hasOwnProperty('media_type') && !validateMediaType(options.media_type)) {
          return reject(new Error('media_type values must match image||audio||image,audio||audio,image'));
        }
        if (options.hasOwnProperty('year_start') && !validateYear(options.year_start)) {
          return reject(new Error('year_start must be in "YYYY" format'));
        }
        if (options.hasOwnProperty('year_end') && !validateYear(options.year_end)) {
          return reject(new Error('year_end must be in "YYYY" format'));
        }
        return (0, _util.sendRequest)(baseurl, '/search', options, resolve, reject, _util.handleResult, true);
      });
    },

    asset: function asset(nasaId) {
      return new _promise2.default(function (resolve, reject) {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return (0, _util.sendRequest)(baseurl, '/asset/' + nasaId, {}, resolve, reject, _util.handleResult, true);
      });
    },

    metadata: function metadata(nasaId) {
      return new _promise2.default(function (resolve, reject) {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return (0, _util.sendRequest)(baseurl, '/metadata/' + nasaId, {}, resolve, reject, _util.handleResult, true);
      });
    },

    captions: function captions(nasaId) {
      return new _promise2.default(function (resolve, reject) {
        if (!nasaId) return reject(new Error('nasaId is required'));
        return (0, _util.sendRequest)(baseurl, '/captions/' + nasaId, {}, resolve, reject, _util.handleResult, true);
      });
    }

  };
}
module.exports = exports['default'];