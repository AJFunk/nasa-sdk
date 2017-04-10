import { EPIC } from 'index';

describe('EPIC.fetch()', () => {
  it('returns natural array', () =>
    EPIC.fetch('natural').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns enhanced array', () =>
    EPIC.fetch('enhanced').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns an error', () =>
    EPIC.fetch().then((err) => expect(err).to.be.an('error'))
  );

  it('returns an error', () =>
    EPIC.fetch('bad-type').then((err) => expect(err).to.be.an('error'))
  );
});

describe('EPIC.date()', () => {
  it('returns natural array', () =>
    EPIC.date('natural', '2015-10-31').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns enhanced array', () =>
    EPIC.date('enhanced', '2015-10-31').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns an error', () =>
    EPIC.date().then((err) => expect(err).to.be.an('error'))
  );

  it('returns an error', () =>
    EPIC.date('bad-type', 'bad-date').then((err) => expect(err).to.be.an('error'))
  );
});

describe('EPIC.all()', () => {
  it('returns natural array', () =>
    EPIC.all('natural').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns enhanced array', () =>
    EPIC.all('enhanced').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns an error', () =>
    EPIC.all().then((err) => expect(err).to.be.an('error'))
  );

  it('returns an error', () =>
    EPIC.all('bad-type').then((err) => expect(err).to.be.an('error'))
  );
});

describe('EPIC.available()', () => {
  it('returns natural array', () =>
    EPIC.available('natural').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns enhanced array', () =>
    EPIC.available('enhanced').then((data) => expect(data).to.be.instanceof(Array))
  );

  it('returns an error', () =>
    EPIC.available().then((err) => expect(err).to.be.an('error'))
  );

  it('returns an error', () =>
    EPIC.available('bad-type').then((err) => expect(err).to.be.an('error'))
  );
});
