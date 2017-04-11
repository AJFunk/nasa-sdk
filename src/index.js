import { setNasaApiKey } from './config';

const APOD = require('./apod')();
const CAD = require('./cad')();
const Earth = require('./earth')();
const EONET = require('./eonet')();
const MarsPhotos = require('./mars-photos')();
const NEO = require('./neo')();
const Patents = require('./patents')();
const Sounds = require('./sounds')();

export {
  APOD,
  CAD,
  Earth,
  EONET,
  MarsPhotos,
  NEO,
  Patents,
  Sounds,
  setNasaApiKey,
};
