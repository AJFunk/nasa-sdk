import { MarsPhotos } from 'index';

describe('MarsPhotos.fetch()', () => {
  it('returns object', () =>
    MarsPhotos.fetch('curiosity', { sol: 5 }).then(data =>
      expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    MarsPhotos.fetch('curiosity', {
      camera: 'fhaz',
      earth_date: '2016-03-12',
    }).then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    MarsPhotos.fetch('spirit', {
      camera: 'navcam',
      earth_date: '2016-03-12',
      page: 2,
    }).then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns error message', () =>
    MarsPhotos.fetch().catch(err => expect(err).toexist)
  );

  it('returns error message', () =>
    MarsPhotos.fetch('curiosity').catch(err => expect(err).toexist)
  );

  it('returns error message', () =>
    MarsPhotos.fetch('badrover').catch(err => expect(err).toexist)
  );

  it('returns error message', () =>
    MarsPhotos.fetch('curiosity', { camera: 'pancam' }).catch(err =>
      expect(err).toexist)
  );

  it('returns error message', () =>
    MarsPhotos.fetch('curiosity', { earth_date: '1234' }).catch(err =>
      expect(err).toexist)
  );
});
