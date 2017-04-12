import { EPIC } from 'index';

describe('EPIC.fetch()', () => {
  it('returns object', () =>
    EPIC.fetch('natural').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    EPIC.fetch('enhanced').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns error message', () =>
    EPIC.fetch().catch(err => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    EPIC.fetch('naturale').catch(err => expect(err).to.be.an('error'))
  );
});

describe('EPIC.date()', () => {
  it('returns object', () =>
    EPIC.date('natural', '2017-04-10').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    EPIC.date('enhanced', '2017-04-10').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns error message', () =>
    EPIC.date().catch(err => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    EPIC.date('natural').catch(err => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    EPIC.date('enahnced', '2017-04-10').catch(err => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    EPIC.date('enhanced', '04-10-2017').catch(err => expect(err).to.be.an('error'))
  );
});

describe('EPIC.all()', () => {
  it('returns object', () =>
    EPIC.all('natural').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    EPIC.all('enhanced').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns error message', () =>
    EPIC.all().catch(err => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    EPIC.all('naturale').catch(err => expect(err).to.be.an('error'))
  );
});

describe('EPIC.available()', () => {
  it('returns object', () =>
    EPIC.available('natural').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    EPIC.available('enhanced').then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns error message', () =>
    EPIC.available().catch(err => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    EPIC.available('naturale').catch(err => expect(err).to.be.an('error'))
  );
});
