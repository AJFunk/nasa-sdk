import { Images } from 'index';

describe('Images.search()', () => {
  it('returns object and collection items array', () =>
    Images.search({ q: 'Apollo 11' }).then(data => {
      expect(data).to.be.instanceof(Object);
      expect(data.collection.items).to.be.instanceof(Array);
    })
  );

  it('returns object and collection items array', () =>
    Images.search({
      q: 'Apollo 11',
      description: 'moon landing',
      media_type: 'image',
    }).then(data => {
      expect(data).to.be.instanceof(Object);
      expect(data.collection.items).to.be.instanceof(Array);
    })
  );

  it('returns error message', () =>
    Images.search().catch(err => expect(err).to.be.an('error'))
  );

  it('returns error message', () =>
    Images.search({ year_start: '123-456-789' }).catch(err => expect(err).to.be.an('error'))
  );
});

describe('Images.asset()', () => {
  it('returns object and collection items array', () =>
    Images.asset('as11-40-5874').then(data => {
      expect(data).to.be.instanceof(Object);
      expect(data.collection.items).to.be.instanceof(Array);
    })
  );

  it('returns error message', () =>
    Images.asset().catch(err => expect(err).to.be.an('error'))
  );
});

describe('Images.metadata()', () => {
  it('returns object and specific metadata object', () => {
    const metadataObj = { location: 'https://images-assets.nasa.gov/image/as11-40-5874/metadata.json' };
    Images.metadata('as11-40-5874').then(data => assert.deepEqual(data, metadataObj));
  });

  it('returns error message', () =>
    Images.metadata().catch(err => expect(err).to.be.an('error'))
  );
});

describe('Images.captions()', () => {
  it('returns object and specific captions object', () => {
    const captionsObj = { location: 'https://images-assets.nasa.gov/video/172_ISS-Slosh/172_ISS-Slosh.srt' };
    Images.captions('172_ISS-Slosh').then(data => assert.deepEqual(data, captionsObj));
  });

  it('returns error message', () =>
    Images.captions().catch(err => expect(err).to.be.an('error'))
  );
});
