import apod from './apod';
import { setNasaApiKey } from './config';

const APOD = apod();

export {
  APOD,
  setNasaApiKey,
};
