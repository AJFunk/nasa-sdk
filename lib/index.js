'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNasaApiKey = exports.Earth = exports.EONET = exports.NEO = exports.APOD = undefined;

var _apod = require('./apod');

var _apod2 = _interopRequireDefault(_apod);

var _neo = require('./neo');

var _neo2 = _interopRequireDefault(_neo);

var _eonet = require('./eonet');

var _eonet2 = _interopRequireDefault(_eonet);

var _earth = require('./earth');

var _earth2 = _interopRequireDefault(_earth);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APOD = (0, _apod2.default)();
var NEO = (0, _neo2.default)();
var EONET = (0, _eonet2.default)();
var Earth = (0, _earth2.default)();

exports.APOD = APOD;
exports.NEO = NEO;
exports.EONET = EONET;
exports.Earth = Earth;
exports.setNasaApiKey = _config.setNasaApiKey;