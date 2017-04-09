import { Earth } from 'index';

describe('Earth.imagery()', () => {
  it('returns object', () =>
    Earth.imagery().then((data) => expect(data).to.be.instanceof(Object))
  );
});

describe('Earth.assets()', () => {
  it('returns object', () =>
    Earth.assets().then((data) => expect(data).to.be.instanceof(Object))
  );
});
