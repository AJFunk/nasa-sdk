## NASA SDK
[NASA API](https://api.nasa.gov/api.html) wrapper for Node.js

[![Build Status](https://travis-ci.org/AJFunk/nasa-sdk.svg?branch=master)](https://travis-ci.org/AJFunk/nasa-sdk)

### Installation
```sh
npm install --save nasa-sdk
```
### Usage
```javascript
import { APOD, Earth, EONET, MarsPhotos, NEO } from 'nasa-sdk';
```
Only import the modules you need. For example, if you only need the `APOD` and `EONET` modules:
```javascript
import { APOD, EONET } from 'nasa-sdk';
```
To set your API Key, set the environment variable `NASA_API_KEY`. Alternatively, you can set the configuration manually:
```javascript
import { setNasaApiKey } from 'nasa-sdk';
setNasaApiKey('<your-api-key>')
```
## APOD
* [APOD.fetch()](#apod-fetch)

## Earth
* [Earth.imagery()](#earth-imagery)
* [Earth.assets()](#earth-assets)

## EONET
* [EONET.events()](#eonet-events)
* [EONET.categories()](#eonet-categories)
* [EONET.sources()](#eonet-sources)
* [EONET.layers()](#eonet-layers)

## Mars Photos
* [MarsPhotos.fetch()](#marsphotos-fetch)
* [MarsPhotos.manifest()](#marsphotos-manifest)

## NEO
* [NEO.feed()](#neo-feed)
* [NEO.feedToday()](#neo-feedtoday)
* [NEO.fetch()](#neo-fetch)
* [NEO.browse()](#neo-browse)
* [NEO.stats()](#neo-stats)

## Patents
* [Patents.fetch()](#patents-fetch)

- - -
<h3 id='apod-fetch'>APOD.fetch(options)</h3>

returns information for the [Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html)

##### `options` (optional) - **[Object]**
* `date` - **[String]** The date of the APOD image to retrieve. Default is today's date Must be in the format YYYY-MM-DD
* `hd` - **[Boolean]** Determines if the the URL for the high resolution image should be fetched. Default is `false`

```javascript
APOD
	.fetch(options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id="earth-imagery">Earth.imagery(options)</h3>

Retrieves the Landsat 8 image for the supplied location and date

##### `options` (optional) - **[Object]**
* `lat` - **[Number]** The latitude of the imagery's location to retrieve.
* `lon` - **[Number]** The longitude of the imagery's location to retrieve.
* `date` - **[String]** The date of the imagery to retrieve. Default is today's date. Must be in the format `YYYY-MM-DD`
* `cloud_score` - **[Boolean]** Cloud score calculates the percentage of the image covered by clouds when `true`. Default is `false`.

```javascript
Earth
	.imagery({
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
* `lat` - **[Number]** The latitude of the asset's location to retrieve.
* `lon` - **[Number]** The longitude of the asset's location to retrieve.
* `begin` - **[String]** The beginning date of the asset to retrieve. Must be in the format `YYYY-MM-DD`
* `end` - **[String]** The ending date of the asset to retrieve. Default is today's date. Must be in the format `YYYY-MM-DD`

```javascript
Earth
	.assets({
        lon: 100.75,
     	lat: 1.5,
     	begin: '2014-02-01',
	})
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id="eonet-events">EONET.events(options)</h3>

Retrieves a single or list of natural Events recorded by [EONET](https://eonet.sci.gsfc.nasa.gov/)

##### `options` (optional) - **[Object]**
* `eventId` - **[String]** ID of the Event. Pass this property if you are wanting to fetch a single event
* `source` - **[String]** Filter events by Source ID. Multiple Source IDs can be included in the request via CSV (i.e '`InciWeb,EO`')
* `status` - **[String]** `open|closed`. Filter events by only-open or only-closed. Default is `open`.
* `limit` - **[Number]** Limits the number of events returned
* `days` - **[Number]** Limit the number of of prior days (including today) from which events will be returned

```javascript
EONET
	.events({
		eventId: 'EONET_2763'
     	source: 'UNISYS',
     	status: 'open',
     	limit: 5,
     	days: 20,
	})
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id="eonet-categories">EONET.categories(options)</h3>

Retrieves a single or list of types of events by which individual events are cataloged.

##### `options` (optional) - **[Object]**
* `categoryId` - **[Number]** ID of the Category. Pass this property if you are wanting to fetch a single category of events
* `source` - **[String]** Filter categorized events by Source ID. Multiple Source IDs can be included in the request via CSV (i.e '`InciWeb,EO`')
* `status` - **[String]** `open|closed`. Filter categorized events by only-open or only-closed. Default is `open`.
* `limit` - **[Number]** Limits the number of categorized events returned
* `days` - **[Number]** Limit the number of of prior days (including today) from which categorized events will be returned

```javascript
EONET
	.categories({
		categoryId: 14,
     	source: 'InciWeb,EO',
     	status: 'open',
     	limit: 5,
     	days: 20,
	})
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id="eonet-sources">EONET.sources()</h3>

Retrieves a list of references for further information about an event.

```javascript
EONET
	.sources()
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id="eonet-layers">EONET.layers(options)</h3>

Retrieves a list of references to a specific web service (e.g., WMS, WMTS) that can be used to produce imagery of a particular NASA data parameter.

##### `options` (optional) - **[Object]**
* `categoryId` - **[Number]** ID of the Category by which to filter the Layers.

```javascript
EONET
	.layers({
		categoryId: 8
	})
	.then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id='marsphotos-fetch'>MarsPhotos.fetch(roverName, options)</h3>
Get a list of photos from a Mars Rover on a particular Sol/Earth Day

##### `rover` (required) - **[String]**
Rover to fetch photos from. Valid rover names are `curiosity`, `opportunity`, and `spirit`

##### `options` (required) - **[Object]**
* `sol` - **[Number]** Martian day on which photos were taken, relative to when the rover arrived on Mars, starting at `0`. If the `sol` option is not provided, `earth_date` must be provided instead.
* `earth_date` - **[String]** Date on which photos were taken. If the `earth_date` option is not provided, `sol` must be provided. Must be in `YYYY-MM-DD` format.
* `camera` - **[String]** Filter results for photos from a specific camera. See [this rover camera table](https://api.nasa.gov/api.html#MarsPhotos) for a list of available cameras on each rover
* `page` - **[Number]** Page number to fetch from paginated results

```javascript
MarsPhotos
	.fetch('curiosity', {
		camera: 'navcam',
		sol: 10
	})
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id='marsphotos-manifest'>MarsPhotos.manifest(roverName)</h3>
Get a manifest for a Mars Rover

##### `rover` (required) - **[String]**
Rover to fetch manifest for. Valid rover names are `curiosity`, `opportunity`, and `spirit`

```javascript
MarsPhotos
	.manifest('curiosity')
	.then(data => console.log(data))
	.catch(err => console.log(err));
```

<h3 id='neo-feed'>NEO.feed(options)</h3>
Get a list of Near Earth Objects within a date range. The max range for one query is 7 days.

##### `options` (optional) - **[Object]**
* `start_date` - **[String]** Starting date for asteroid search. Default is today's date. Must be in the format `YYYY-MM-DD`
* `end_date` - **[String]** End date for asteroid search. Default is 7 days after `start_date`. Must be in the format `YYYY-MM-DD`
* `detailed` - **[Boolean]** Determine is additional details for asteroids should be included. Default is `false`

```javascript
NEO
	.feed({
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
NEO
	.feedToday()
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

<h3 id='neo-fetch'>NEO.fetch(asteroidId)</h3>
Retieve a Near Earth Object with a given id

##### `asteroidId` (required) - **[String]** ID of NEO

```javascript
NEO
	.fetch('3729835')
	.then(data => console.log(data))
	.catch(err => console.log(err));
```

<h3 id='neo-browse'>NEO.browse()</h3>
Retieve a paginated list of Near Earth Objects

##### `options` (optional) - **[Object]**
* `page` - **[Number]** Page number (zero-indexed)
* `size` - **[Number]** Number of NEOs per page

```javascript
NEO
	.browse({
		page: 2,
		size: 20
   })
   .then(data => console.log(data))
   .catch(err => console.log(err));
```

<h3 id='neo-stats'>NEO.stats()</h3>

Retieve Near Earth Object statistics

```javascript
NEO
	.stats()
	.then(data => console.log(data))
	.catch(err => console.log(err));
```

<h3 id="patents-fetch">Patents.fetch(options)</h3>
Retrieve of list of patents from NASA's patent portfolio

##### `options` (optional) - **[Object]**
* `query` - **[String]** Search text to filter results
* `concept_tags` - **[Boolean]** Return an ordered dictionary of concepts from the patent abstract. Default is `false`
* `limit` - **[Number]** Maximum number of patents to return. If omitted, all found patents will be returned.

```javascript
Patents
	.fetch({
    	query: 'temperature',
        concept_tags: true,
    })
	.then(data => console.log(data))
	.catch(err => console.log(err));
```
