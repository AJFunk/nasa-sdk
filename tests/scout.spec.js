import { Scout } from 'index';

describe('Scout.fetch()', () => {
  it('returns object', () =>
    Scout.fetch().then(data => expect(data).to.be.instanceof(Object))
  );
});
