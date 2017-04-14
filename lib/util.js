'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDateTime = exports.validateDate = exports.sendRequest = undefined;

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendRequest = function sendRequest(baseurl, endpoint) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var cb = arguments[3];
  var noKey = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

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

  var params = {
    host: baseurl,
    path: url,
    method: 'GET'
  };

  var req = _https2.default.request(params, function (res) {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      return cb(new Error('statusCode=' + res.statusCode));
    }
    var buf = [];
    res.on('data', function (c) {
      return buf.push(c);
    });
    res.on('end', function () {
      return cb(null, JSON.parse(Buffer.concat(buf).toString()));
    });
    return undefined;
  });
  req.on('error', function (err) {
    return cb(new Error(err));
  });
  req.end();
};

var validateDate = function validateDate(date) {
  if (!date || typeof date !== 'string') return false;
  return date.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

var validateDateTime = function validateDateTime(date) {
  if (!date || typeof date !== 'string') return false;
  return date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/) !== null;
};

exports.sendRequest = sendRequest;
exports.validateDate = validateDate;
exports.validateDateTime = validateDateTime;