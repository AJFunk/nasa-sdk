import { NHATS } from 'index';

describe('NHATS.fetch()', () => {
  it('returns object', () =>
    NHATS.fetch().then(data => expect(data).to.be.instanceof(Object))
  );
});
