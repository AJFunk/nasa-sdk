import { Patents } from 'index';

describe('Patents.fetch()', () => {
  it('returns object', () =>
    Patents.fetch().then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object with concepts', () =>
    Patents.fetch({ query: 'temperature', concept_tags: true }).then(data =>
      expect(data.results[0].concepts).to.be.instanceof(Object))
  );

  it('returns object with a single patent', () =>
    Patents.fetch({ limit: 1 }).then(data =>
      assert.equal(data.count, data.results.length, 1))
  );
});
