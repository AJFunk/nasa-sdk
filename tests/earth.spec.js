import { Earth } from 'index';

describe('Earth.imagery()', () => {
  it('returns object', () =>
    Earth.imagery().then((data) => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () => {
    Earth.imagery({
      lon: 100.75,
      lat: 1.5,
      date: '2014-02-01',
      cloud_score: true,
    }).then((data) => expect(data).to.be.instanceof(Object));
  });

  it('returns specific Earth Imagery object', () => {
    const earthImageryObj = {
      date: '2014-02-04T03:30:01',
      url: 'https://earthengine.googleapis.com/api/thumb?thumbid=2945b5e5775aa438ce0e2b0750febcd5&token=9cee7d98a4ddd6d8bafaafa1fbb7ec2d',
      cloud_score: 0.03890583615451812,
      id: 'LC8_L1T_TOA/LC81270592014035LGN00',
    };
    Earth.imagery({
      lon: 100.75,
      lat: 1.5,
      date: '2014-02-01',
      cloud_score: true,
    }).then((data) => assert.deepEqual(data, earthImageryObj));
  });
});

describe('Earth.assets()', () => {
  it('returns object', () =>
    Earth.assets().then((data) => expect(data).to.be.instanceof(Object))
  );

  it('returns object', () => {
    Earth.assets({
      lon: 100.75,
      lat: 1.5,
      begin: '2014-02-01',
    }).then((data) => expect(data).to.be.instanceof(Object));
  });

  it('returns a specific Earth Asset object', () => {
    const earthAssetObj = {
      count: 66,
      results: [
        {
          date: '2014-02-04T03:30:01',
          id: 'LC8_L1T_TOA/LC81270592014035LGN00',
        },
        {
          date: '2014-02-20T03:29:47',
          id: 'LC8_L1T_TOA/LC81270592014051LGN00',
        },
        {
          date: '2014-03-08T03:29:33',
          id: 'LC8_L1T_TOA/LC81270592014067LGN00',
        },
        {
          date: '2014-03-24T03:29:20',
          id: 'LC8_L1T_TOA/LC81270592014083LGN00',
        },
        {
          date: '2014-04-09T03:29:06',
          id: 'LC8_L1T_TOA/LC81270592014099LGN00',
        },
        {
          date: '2014-04-25T03:28:50',
          id: 'LC8_L1T_TOA/LC81270592014115LGN00',
        },
        {
          date: '2014-05-11T03:28:35',
          id: 'LC8_L1T_TOA/LC81270592014131LGN00',
        },
        {
          date: '2014-05-27T03:28:32',
          id: 'LC8_L1T_TOA/LC81270592014147LGN00',
        },
        {
          date: '2014-06-12T03:28:41',
          id: 'LC8_L1T_TOA/LC81270592014163LGN00',
        },
        {
          date: '2014-06-28T03:28:43',
          id: 'LC8_L1T_TOA/LC81270592014179LGN00',
        },
        {
          date: '2014-07-14T03:28:51',
          id: 'LC8_L1T_TOA/LC81270592014195LGN01',
        },
        {
          date: '2014-07-30T03:28:56',
          id: 'LC8_L1T_TOA/LC81270592014211LGN00',
        },
        {
          date: '2014-08-15T03:29:03',
          id: 'LC8_L1T_TOA/LC81270592014227LGN00',
        },
        {
          date: '2014-08-31T03:29:05',
          id: 'LC8_L1T_TOA/LC81270592014243LGN00',
        },
        {
          date: '2014-09-16T03:29:07',
          id: 'LC8_L1T_TOA/LC81270592014259LGN00',
        },
        {
          date: '2014-10-02T03:29:09',
          id: 'LC8_L1T_TOA/LC81270592014275LGN00',
        },
        {
          date: '2014-10-18T03:29:13',
          id: 'LC8_L1T_TOA/LC81270592014291LGN00',
        },
        {
          date: '2014-11-03T03:29:11',
          id: 'LC8_L1T_TOA/LC81270592014307LGN00',
        },
        {
          date: '2014-11-19T03:29:10',
          id: 'LC8_L1T_TOA/LC81270592014323LGN00',
        },
        {
          date: '2014-12-05T03:29:09',
          id: 'LC8_L1T_TOA/LC81270592014339LGN00',
        },
        {
          date: '2014-12-21T03:29:07',
          id: 'LC8_L1T_TOA/LC81270592014355LGN00',
        },
        {
          date: '2015-01-06T03:29:02',
          id: 'LC8_L1T_TOA/LC81270592015006LGN00',
        },
        {
          date: '2015-02-07T03:28:54',
          id: 'LC8_L1T_TOA/LC81270592015038LGN00',
        },
        {
          date: '2015-02-23T03:28:48',
          id: 'LC8_L1T_TOA/LC81270592015054LGN00',
        },
        {
          date: '2015-03-11T03:28:37',
          id: 'LC8_L1T_TOA/LC81270592015070LGN00',
        },
        {
          date: '2015-03-27T03:28:29',
          id: 'LC8_L1T_TOA/LC81270592015086LGN00',
        },
        {
          date: '2015-04-12T03:28:22',
          id: 'LC8_L1T_TOA/LC81270592015102LGN00',
        },
        {
          date: '2015-04-28T03:28:16',
          id: 'LC8_L1T_TOA/LC81270592015118LGN00',
        },
        {
          date: '2015-05-14T03:28:00',
          id: 'LC8_L1T_TOA/LC81270592015134LGN00',
        },
        {
          date: '2015-05-30T03:28:04',
          id: 'LC8_L1T_TOA/LC81270592015150LGN00',
        },
        {
          date: '2015-06-15T03:28:16',
          id: 'LC8_L1T_TOA/LC81270592015166LGN00',
        },
        {
          date: '2015-07-01T03:28:23',
          id: 'LC8_L1T_TOA/LC81270592015182LGN00',
        },
        {
          date: '2015-07-17T03:28:33',
          id: 'LC8_L1T_TOA/LC81270592015198LGN00',
        },
        {
          date: '2015-08-02T03:28:36',
          id: 'LC8_L1T_TOA/LC81270592015214LGN00',
        },
        {
          date: '2015-08-18T03:28:43',
          id: 'LC8_L1T_TOA/LC81270592015230LGN00',
        },
        {
          date: '2015-09-03T03:28:48',
          id: 'LC8_L1T_TOA/LC81270592015246LGN00',
        },
        {
          date: '2015-10-05T03:29:00',
          id: 'LC8_L1T_TOA/LC81270592015278LGN00',
        },
        {
          date: '2015-10-21T03:29:03',
          id: 'LC8_L1T_TOA/LC81270592015294LGN00',
        },
        {
          date: '2015-11-22T03:29:08',
          id: 'LC8_L1T_TOA/LC81270592015326LGN00',
        },
        {
          date: '2015-12-08T03:29:07',
          id: 'LC8_L1T_TOA/LC81270592015342LGN00',
        },
        {
          date: '2015-12-24T03:29:08',
          id: 'LC8_L1T_TOA/LC81270592015358LGN00',
        },
        {
          date: '2016-01-09T03:29:03',
          id: 'LC8_L1T_TOA/LC81270592016009LGN00',
        },
        {
          date: '2016-01-25T03:29:04',
          id: 'LC8_L1T_TOA/LC81270592016025LGN00',
        },
        {
          date: '2016-02-10T03:28:59',
          id: 'LC8_L1T_TOA/LC81270592016041LGN00',
        },
        {
          date: '2016-02-26T03:28:53',
          id: 'LC8_L1T_TOA/LC81270592016057LGN00',
        },
        {
          date: '2016-03-13T03:28:50',
          id: 'LC8_L1T_TOA/LC81270592016073LGN00',
        },
        {
          date: '2016-03-29T03:28:40',
          id: 'LC8_L1T_TOA/LC81270592016089LGN00',
        },
        {
          date: '2016-04-14T03:28:35',
          id: 'LC8_L1T_TOA/LC81270592016105LGN00',
        },
        {
          date: '2016-04-30T03:28:35',
          id: 'LC8_L1T_TOA/LC81270592016121LGN00',
        },
        {
          date: '2016-06-01T03:28:39',
          id: 'LC8_L1T_TOA/LC81270592016153LGN00',
        },
        {
          date: '2016-07-03T03:28:51',
          id: 'LC8_L1T_TOA/LC81270592016185LGN00',
        },
        {
          date: '2016-07-19T03:28:58',
          id: 'LC8_L1T_TOA/LC81270592016201LGN00',
        },
        {
          date: '2016-08-04T03:29:01',
          id: 'LC8_L1T_TOA/LC81270592016217LGN00',
        },
        {
          date: '2016-08-20T03:29:06',
          id: 'LC8_L1T_TOA/LC81270592016233LGN00',
        },
        {
          date: '2016-09-05T03:29:12',
          id: 'LC8_L1T_TOA/LC81270592016249LGN00',
        },
        {
          date: '2016-09-21T03:29:13',
          id: 'LC8_L1T_TOA/LC81270592016265LGN00',
        },
        {
          date: '2016-10-23T03:29:20',
          id: 'LC8_L1T_TOA/LC81270592016297LGN00',
        },
        {
          date: '2016-11-08T03:29:19',
          id: 'LC8_L1T_TOA/LC81270592016313LGN00',
        },
        {
          date: '2016-11-24T03:29:20',
          id: 'LC8_L1T_TOA/LC81270592016329LGN00',
        },
        {
          date: '2016-12-10T03:29:17',
          id: 'LC8_L1T_TOA/LC81270592016345LGN00',
        },
        {
          date: '2017-01-11T03:29:10',
          id: 'LC8_L1T_TOA/LC81270592017011LGN00',
        },
        {
          date: '2017-01-27T03:29:04',
          id: 'LC8_L1T_TOA/LC81270592017027LGN00',
        },
        {
          date: '2017-02-12T03:28:56',
          id: 'LC8_L1T_TOA/LC81270592017043LGN00',
        },
        {
          date: '2017-02-28T03:28:51',
          id: 'LC8_L1T_TOA/LC81270592017059LGN00',
        },
        {
          date: '2017-03-16T03:28:42',
          id: 'LC8_L1T_TOA/LC81270592017075LGN00',
        },
        {
          date: '2017-04-01T03:28:34',
          id: 'LC8_L1T_TOA/LC81270592017091LGN00',
        },
      ],
    };
    Earth.assets({
      lon: 100.75,
      lat: 1.5,
      begin: '2014-02-01',
      end: '2017-04-09',
    }).then((data) => assert.deepEqual(data, earthAssetObj));
  });
});
