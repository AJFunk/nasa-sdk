import apod from './apod';
import neo from './neo';
import eonet from './eonet';
import { setNasaApiKey } from './config';

const APOD = apod();
const NEO = neo();
const EONET = eonet();

export {
  APOD,
  NEO,
  EONET,
  setNasaApiKey,
};
