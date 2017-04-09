## NASA SDK
[NASA API](https://api.nasa.gov/api.html) wrapper for Node.js

[![Build Status](https://travis-ci.org/AJFunk/nasa-sdk.svg?branch=master)](https://travis-ci.org/AJFunk/nasa-sdk)

### Installation
```sh
npm install --save nasa-sdk
```
### Usage
```javascript
import { APOD, NEO, Earth } from 'nasa-sdk';
```
Only import the modules you need. For example, if you only need the `APOD` and `EONET` modules:
```javascript
import { APOD } from 'nasa-sdk';
```
To set your API Key, set the environment variable `NASA_API_KEY`. Alternatively, you can set the configuration manually
```javascript
import { setNasaApiKey } from 'nasa-sdk';
setNasaApiKey('<your-api-key>')
```
## APOD
* [APOD.fetch()](#apod-fetch)

## NEO
* [NEO.feed()](#neo-feed)
* [NEO.feedToday()](#neo-feedtoday)
* [NEO.fetch()](#neo-fetch)
* [NEO.browse()](#neo-browse)
* [NEO.stats()](#neo-stats)

## Earth
* [Earth.imagery()](#earth-imagery)
* [Earth.assets()](#earth-assets)

- - -
<h3 id='apod-fetch'>APOD.fetch(options)</h3>
returns information for the [Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html)

##### `options` (optional) - **[Object]**
* `date` - **[String]** The date of the APOD image to retrieve. Default is today's date Must be in the format YYYY-MM-DD
* `hd` - **[Boolean]** Determines if the the URL for the high resolution image should be fetched. Default is `false`

```javascript
APOD.fetch(options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id='neo-feed'>NEO.feed(options)</h3>
Get a list of Near Earth Objects within a date range. The max range for one query is 7 days.

##### `options` (optional) - **[Object]**
* `start_date` - **[String]** Starting date for asteroid search. Default is today's date. Must be in the format YYYY-MM-DD
* `end_date` - **[String]** End date for asteroid search. Default is 7 days after `start_date`. Must be in the format YYYY-MM-DD
* `detailed` - **[Boolean]** Determine is additional details for asteroids should be included. Default is `false`

```javascript
NEO.feed({
    start_date: '2016-06-12',
    end_date: '2016-06-15'
   })
   .then(data => console.log(data))
   .catch(err => console.log(err));
```

<h3 id='neo-feedtoday'>NEO.feedToday(options)</h3>
Get a list of Near Earth Objects for today. The max range for one query is 7 days.

##### `options` (optional) - **[Object]**
* `detailed` - **[Boolean]** Determine is additional details for asteroids should be included. Default is `false`

```javascript
NEO.feedToday()
   .then(data => console.log(data))
   .catch(err => console.log(err));
```

<h3 id='neo-fetch'>NEO.fetch(asteroidId)</h3>
Retieve a Near Earth Object with a given id

##### `asteroidId` (required) - **[String]** ID of NEO

```javascript
NEO.fetch('3729835')
   .then(data => console.log(data))
   .catch(err => console.log(err));
```

<h3 id='neo-browse'>NEO.browse()</h3>
Retieve a paginated list of Near Earth Objects

##### `options` (optional) - **[Object]**
* `page` - **[Number]** Page number (zero-indexed)
* `size` - **[Number]** Number of NEOs per page

```javascript
NEO.browse({
     page: 2,
     size: 20
   })
   .then(data => console.log(data))
   .catch(err => console.log(err));
```

<h3 id='neo-stats'>NEO.stats()</h3>

Retieve Near Earth Object statistics

```javascript
NEO.stats()
   .then(data => console.log(data))
   .catch(err => console.log(err));
```

<h3 id="earth-imagery">Earth.imagery(options)</h3>

Retrieves the Landsat 8 image for the supplied location and date

##### `options` (optional) - **[Object]**
* `lat` - **[Float]** The latitude of the imagery's location to retrieve.
* `lon` - **[Float]** The longitude of the imagery's location to retrieve.
* `date` - **[String]** The date of the imagery to retrieve. Default is today's date. Must be in the format `YYYY-MM-DD`
* `cloud_score` - **[Boolean]** Cloud score calculates the percentage of the image covered by clouds when `true`. Default is `false`.

```javascript
Earth.imagery({
     lon: 100.75,
     lat: 1.5,
     date: '2014-02-01',
     cloud_score: true,
   })
   .then(data => console.log(data))
   .catch(err => console.log(err));
```

<h3 id="earth-assets">Earth.assets(options)</h3>

Retrieves the date-times and asset names for available imagery for a supplied location

##### `options` (optional) - **[Object]**
* `lat` - **[Float]** The latitude of the asset's location to retrieve.
* `lon` - **[Float]** The longitude of the asset's location to retrieve.
* `begin` - **[String]** The beginning date of the asset to retrieve. Must be in the format `YYYY-MM-DD`
* `end` - **[String]** The ending date of the asset to retrieve. Default is today's date. Must be in the format `YYYY-MM-DD`

```javascript
Earth.assets({
     lon: 100.75,
     lat: 1.5,
     begin: '2014-02-01',
   })
   .then(data => console.log(data))
   .catch(err => console.log(err));
```
