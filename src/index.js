import apod from './apod';
import neo from './neo';
import earth from './earth';
import { setNasaApiKey } from './config';

const APOD = apod();
const NEO = neo();
const Earth = earth();

export {
  APOD,
  NEO,
  Earth,
  setNasaApiKey,
};
