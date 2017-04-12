import { APOD } from 'index';

describe('APOD.fetch()', () => {
  it('returns object', () =>
    APOD.fetch().then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () =>
    APOD.fetch({ date: '2016-06-01' }).then(data => expect(data).to.be.instanceof(Object))
  );

  it('returns specific APOD object', () => {
    const apodObj = {
      date: '2016-06-01',
      explanation: 'What star created this huge expanding puffball?  Featured here is the first ' +
      'expansion movie ever created for Tycho\'s supernova remnant, the result of a stellar ' +
      'explosion first recorded over 400 years ago by the famous astronomer Tycho Brahe.  The ' +
      '2-second video is a time-lapse composite of  X-ray images taken by the orbiting Chandra ' +
      'X-ray Observatory between the years 2000 and 2015, added to a stock optical frame. The ' +
      'expanding gas cloud is extremely hot, while slightly different expansion speeds have ' +
      'given the cloud a puffy appearance.  Although the star that created SN 1572, is likely ' +
      'completely gone, a star dubbed Tycho G, too dim to be discerned here, is thought to be a ' +
      'companion. Finding progenitor remnants of Tycho\'s supernova is particularly important ' +
      'because the supernova is of Type Ia, an important rung in the distance ladder that ' +
      'calibrates the scale of the visible universe.   The peak brightness of Type Ia supernovas ' +
      'is thought to be well understood, making them quite valuable in exploring the ' +
      'relationship between faintness and farness in the distant universe.',
      media_type: 'video',
      service_version: 'v1',
      title: 'Tycho\'s Supernova Remnant Expands',
      url: 'https://www.youtube.com/embed/jOmb-STnOg4?rel=0',
    };
    return APOD.fetch({ date: '2016-06-01' }).then(data => assert.deepEqual(data, apodObj));
  });
});
