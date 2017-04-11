import { Fireballs } from 'index';

describe('Fireballs.fetch()', function runTests() {
  this.timeout(5000);

  it('returns object', () =>
    Fireballs.fetch().then((data) => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    Fireballs.fetch({
      'date-min': '2015-01-05',
      'date-max': '2015-01-05T05:30:20',
      'energy-min': 0.3,
    }).then((data) => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    Fireballs.fetch({
      'date-min': 'now',
      'date-max': '+20',
    }).catch((err) => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    Fireballs.fetch({ 'date-min': '1234' }).catch((err) => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    Fireballs.fetch({
      'date-min': '2015-01-05',
      'date-max': '2015-01-08T12',
    }).catch((err) => expect(err).to.be.an('error'))
  );
});
