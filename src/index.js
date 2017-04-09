import apod from './apod';
import neo from './neo';
import { setNasaApiKey } from './config';

const APOD = apod();
const NEO = neo();

export {
  APOD,
  NEO,
  setNasaApiKey,
};
