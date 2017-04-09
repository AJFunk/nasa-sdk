let apiKey = process.env.NASA_API_KEY;
const setNasaApiKey = (key: string): null => {
  apiKey = key;
  return null;
};

export {
  apiKey,
  setNasaApiKey,
};
