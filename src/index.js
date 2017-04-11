import { setNasaApiKey } from './config';
setNasaApiKey('t1IThuiPrgNMbpMsJbcmGB1EyvhlbaebAtRO2NKR');

const APOD = require('./apod')();
const Earth = require('./earth')();
const EONET = require('./eonet')();
const EPIC = require('./epic')();
const MarsPhotos = require('./mars-photos')();
const NEO = require('./neo')();
const Patents = require('./patents')();
const Sounds = require('./sounds')();

export {
  APOD,
  Earth,
  EONET,
  EPIC,
  MarsPhotos,
  NEO,
  Patents,
  Sounds,
  setNasaApiKey,
};
