'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apod;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function apod() {
  function sendRequest(endpoint) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cb = arguments[2];

    var url = 'https://api.nasa.gov/planetary/apod?';
    if (options) {
      if (options.date) url = url + 'date=' + options.date + '&';
      if (options.hd) url = url + 'hd=' + options.hd + '&';
    }
    if (_config.apiKey) url = url + 'api_key=' + _config.apiKey;
    _axios2.default.get(url).then(function (res) {
      return cb(null, res.data);
    }).catch(function (err) {
      return cb(err);
    });
  }

  return {
    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      sendRequest(null, options, function (err, data) {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];