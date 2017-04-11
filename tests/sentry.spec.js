import { Sentry } from 'index';

describe('Sentry.fetch()', () => {
  it('returns object', () =>
    Sentry.fetch().then((data) => expect(data).to.be.instanceof(Object))
  );
});
