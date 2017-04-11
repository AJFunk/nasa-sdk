'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDateTime = exports.validateDate = exports.sendRequest = exports.handleError = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendRequest = function sendRequest(endpoint) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cb = arguments[2];
  var noKey = arguments[3];

  var url = endpoint + '?';
  if (options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        var validKey = typeof options[key] === 'string' ? options[key].replace(/\s/g, '%20') : options[key];
        url = '' + url + key + '=' + validKey + '&';
      }
    }
  }
  if (_config.apiKey && !noKey) url = url + 'api_key=' + _config.apiKey;
  if (url[url.length - 1] === '&') url = url.substr(0, url.length - 1);
  return _axios2.default.get(url).then(function (res) {
    return cb(null, res.data);
  }).catch(function (err) {
    return cb(err);
  });
};

var handleError = function handleError(message, deferred) {
  deferred.reject(new Error(message));
  return deferred.promise;
};

var validateDate = function validateDate(date) {
  if (!date || typeof date !== 'string') return false;
  return date.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

var validateDateTime = function validateDateTime(date) {
  if (!date || typeof date !== 'string') return false;
  return date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/) !== null;
};

exports.handleError = handleError;
exports.sendRequest = sendRequest;
exports.validateDate = validateDate;
exports.validateDateTime = validateDateTime;