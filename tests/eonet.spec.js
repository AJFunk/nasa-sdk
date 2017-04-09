import { EONET } from 'index';

describe('EONET.events()', () => {
  it('returns object with array of events', () => {
    EONET.events().then((data) => {
      expect(data).to.be.instanceof(Object);
      expect(data.events).to.be.instanceof(Array);
    });
  });

  it('returns object', () =>
    EONET.events({ eventId: 'EONET_2763' }).then((data) => expect(data).to.be.instanceof(Object))
  );
});

describe('EONET.categories()', () => {
  it('returns object with array of categories', () => {
    EONET.categories().then((data) => {
      expect(data).to.be.instanceof(Object);
      expect(data.categories).to.be.instanceof(Array);
    });
  });

  it('returns object', () =>
    EONET.categories({ categoryId: 6 }).then((data) => expect(data).to.be.instanceof(Object))
  );
});

describe('EONET.sources()', () => {
  it('returns object with array of sources', () => {
    EONET.sources().then((data) => {
      expect(data).to.be.instanceof(Object);
      expect(data.sources).to.be.instanceof(Array);
    });
  });
});

describe('EONET.layers()', () => {
  it('returns object with array of layers', () => {
    EONET.layers().then((data) => {
      expect(data).to.be.instanceof(Object);
      expect(data.layers).to.be.instanceof(Array);
    });
  });

  it('returns object', () =>
    EONET.layers({ categoryId: 8 }).then((data) => expect(data).to.be.instanceof(Object))
  );
});
