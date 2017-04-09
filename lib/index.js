'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNasaApiKey = exports.APOD = undefined;

var _apod = require('./apod');

var _apod2 = _interopRequireDefault(_apod);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APOD = (0, _apod2.default)();

exports.APOD = APOD;
exports.setNasaApiKey = _config.setNasaApiKey;