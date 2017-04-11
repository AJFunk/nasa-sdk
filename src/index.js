import { setNasaApiKey } from './config';

const APOD = require('./apod')();
const CAD = require('./cad')();
const Earth = require('./earth')();
const EONET = require('./eonet')();
const EPIC = require('./epic')();
const Fireballs = require('./fireballs')();
const MarsPhotos = require('./mars-photos')();
const NEO = require('./neo')();
const NHATS = require('./nhats')();
const Patents = require('./patents')();
const Sentry = require('./sentry')();
const Sounds = require('./sounds')();

export {
  APOD,
  CAD,
  Earth,
  EONET,
  EPIC,
  Fireballs,
  MarsPhotos,
  NEO,
  NHATS,
  Patents,
  Sentry,
  Sounds,
  setNasaApiKey,
};
