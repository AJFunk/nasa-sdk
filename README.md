## NASA SDK
[NASA API](https://api.nasa.gov/api.html) wrapper for Node.js

[![Build Status](https://travis-ci.org/AJFunk/nasa-sdk.svg?branch=master)](https://travis-ci.org/AJFunk/nasa-sdk)

### Installation
```sh
npm install --save nasa-sdk
```
### Usage
```javascript
import { APOD, NEO } from 'nasa-sdk';
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
