'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendRequest = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendRequest = function sendRequest(endpoint) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cb = arguments[2];

  var url = 'https://api.nasa.gov/' + endpoint + '?';
  if (options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        url = '' + url + key + '=' + options[key] + '&';
      }
    }
  }
  if (_config.apiKey) url = url + 'api_key=' + _config.apiKey;
  return _axios2.default.get(url).then(function (res) {
    return cb(null, res.data);
  }).catch(function (err) {
    return cb(err);
  });
};

exports.sendRequest = sendRequest;