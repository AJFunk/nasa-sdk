import { setNasaApiKey } from './config';

const APOD = require('./apod')();
const NEO = require('./neo')();
const EONET = require('./eonet')();
const Earth = require('./earth')();

export {
  APOD,
  NEO,
  EONET,
  Earth,
  setNasaApiKey,
};
