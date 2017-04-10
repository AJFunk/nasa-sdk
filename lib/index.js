'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNasaApiKey = exports.NEO = exports.MarsPhotos = exports.EONET = exports.Earth = exports.APOD = undefined;

var _config = require('./config');

var APOD = require('./apod')();
var Earth = require('./earth')();
var EONET = require('./eonet')();
var MarsPhotos = require('./mars-photos')();
var NEO = require('./neo')();

exports.APOD = APOD;
exports.Earth = Earth;
exports.EONET = EONET;
exports.MarsPhotos = MarsPhotos;
exports.NEO = NEO;
exports.setNasaApiKey = _config.setNasaApiKey;