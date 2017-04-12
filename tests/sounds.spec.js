import { Sounds } from 'index';

describe('Sounds.fetch()', () => {
  it('returns object', () =>
    Sounds.fetch().then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object with a single sound object', () =>
    Sounds.fetch({ limit: 1 }).then(data =>
      assert.equal(data.count, data.results.length, 1))
  );
});
