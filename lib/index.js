'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNasaApiKey = exports.Sounds = exports.Patents = exports.NEO = exports.MarsPhotos = exports.EONET = exports.Earth = exports.APOD = undefined;

var _config = require('./config');

var APOD = require('./apod')();
var Earth = require('./earth')();
var EONET = require('./eonet')();
var MarsPhotos = require('./mars-photos')();
var NEO = require('./neo')();
var Patents = require('./patents')();
var Sounds = require('./sounds')();

exports.APOD = APOD;
exports.Earth = Earth;
exports.EONET = EONET;
exports.MarsPhotos = MarsPhotos;
exports.NEO = NEO;
exports.Patents = Patents;
exports.Sounds = Sounds;
exports.setNasaApiKey = _config.setNasaApiKey;