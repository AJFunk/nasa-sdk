import { apiKey } from 'config';
import { setNasaApiKey } from 'index';

describe('setNasaApiKey()', () => {
  it('sets apiKey', () => {
    const oldKey = apiKey;
    setNasaApiKey('1234');
    expect(apiKey).to.be.equal('1234');
    return setNasaApiKey(oldKey);
  });
});
