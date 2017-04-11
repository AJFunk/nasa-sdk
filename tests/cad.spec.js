import { CAD } from 'index';

describe('CAD.fetch()', function runTests() {
  this.timeout(5000);

  it('returns object', () =>
    CAD.fetch().then((data) => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    CAD.fetch({
      'date-min': '2015-01-05',
      'date-max': '+20',
    }).then((data) => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    CAD.fetch({
      'date-min': 'now',
      'date-max': '+20',
    }).then((data) => expect(data).to.be.instanceof(Object))
  );

  it('returns error message', () =>
    CAD.fetch({ 'date-min': '1234' }).catch((err) => expect(err).to.exist)
  );

  it('returns error message', () =>
    CAD.fetch({
      'date-min': '2015-01-05',
      'date-max': '2015-01-08T12',
    }).catch((err) => expect(err).to.exist)
  );
});
