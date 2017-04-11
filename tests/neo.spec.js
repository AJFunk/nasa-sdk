import { NEO } from 'index';

describe('NEO.feed()', () => {
  it('returns object', () =>
    NEO.feed().then((data) => expect(data).to.be.instanceof(Object))
  );
});

describe('NEO.feedToday()', () => {
  it('returns object', () =>
    NEO.feedToday().then((data) => expect(data).to.be.instanceof(Object))
  );
});

describe('NEO.fetch()', () => {
  it('returns object', () =>
    NEO.fetch('3729835').then((data) => expect(data).to.be.instanceof(Object))
  );
  it('returns error message', () =>
    NEO.fetch().catch((err) => expect(err).toexist)
  );
});

describe('NEO.browse()', () => {
  it('returns object', () =>
    NEO.browse().then((data) => expect(data).to.be.instanceof(Object))
  );
  it('returns object with 10 NEOs', () =>
    NEO.browse({ page: 1, size: 10 }).then((data) =>
      assert.equal(data.near_earth_objects.length, 10))
  );
});

describe('NEO.stats()', () => {
  it('returns object', () =>
    NEO.stats().then((data) => expect(data).to.be.instanceof(Object))
  );
});
