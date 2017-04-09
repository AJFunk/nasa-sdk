import apod from './apod';
import neo from './neo';
import epic from './epic';
import { setNasaApiKey } from './config';

const APOD = apod();
const NEO = neo();
const EPIC = epic();

export {
  APOD,
  NEO,
  EPIC,
  setNasaApiKey,
};
