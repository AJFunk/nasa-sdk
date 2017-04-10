import apod from './apod';
import neo from './neo';
import eonet from './eonet';
import earth from './earth';
import { setNasaApiKey } from './config';

const APOD = apod();
const NEO = neo();
const EONET = eonet();
const Earth = earth();

export {
  APOD,
  NEO,
  EONET,
  Earth,
  setNasaApiKey,
};
