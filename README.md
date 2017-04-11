## NASA SDK
[NASA API](https://api.nasa.gov/api.html) wrapper for Node.js

[![Build Status](https://travis-ci.org/AJFunk/nasa-sdk.svg?branch=master)](https://travis-ci.org/AJFunk/nasa-sdk)

### Installation
```sh
npm install --save nasa-sdk
```
### Usage
```javascript
import { APOD, Earth, EONET, EPIC, MarsPhotos, NEO } from 'nasa-sdk';
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

Be sure to reference [NASA's API docs](https://api.nasa.gov/api.html)

## APOD - Astronomy Picture of the Day
* [APOD.fetch()](#apod-fetch)

## CAD - SBDB (Small-Body DataBase) Close-Approach Data
* [CAD.fetch()](#cad-fetch)

## Earth - Landsat 8 imagery of Earth
* [Earth.imagery()](#earth-imagery)
* [Earth.assets()](#earth-assets)

## EONET - Earth Observatory Natural Event Tracker
* [EONET.events()](#eonet-events)
* [EONET.categories()](#eonet-categories)
* [EONET.sources()](#eonet-sources)
* [EONET.layers()](#eonet-layers)

## EPIC - Earth Polychromatic Imaging Camera
* [EPIC.fetch()](#epic-fetch)
* [EPIC.date()](#epic-date)
* [EPIC.all()](#epic-all)
* [EPIC.available()](#epic-available)

## Mars Photos - Photos from Mars Rovers
* [MarsPhotos.fetch()](#marsphotos-fetch)
* [MarsPhotos.manifest()](#marsphotos-manifest)

## NEO - Near Earth Objects
* [NEO.feed()](#neo-feed)
* [NEO.feedToday()](#neo-feedtoday)
* [NEO.fetch()](#neo-fetch)
* [NEO.browse()](#neo-browse)
* [NEO.stats()](#neo-stats)

## Patents - NASA's Patent Portfolio
* [Patents.fetch()](#patents-fetch)

## Sounds - Sounds from Space
* [Sounds.fetch()](#sounds-fetch)

- - -
<h3 id='apod-fetch'>APOD.fetch(options)</h3>

returns information for the [Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html)

##### `options` (optional) - **[Object]**
* `date` - **[String]** The date of the APOD image to retrieve. Default is today's date Must be in the format `YYYY-MM-DD`
* `hd` - **[Boolean]** Determines if the the URL for the high resolution image should be fetched. Default is `false`

```javascript
APOD
  .fetch(options)
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='cad-fetch'>CAD.fetch(options)</h3>

returns information current close-approach data for all asteroids and comets in JPL’s [SBDB](https://ssd.jpl.nasa.gov/sbdb.cgi) (Small-Body DataBase)

Most options are filters effectively limiting the data to those matching the constraints, a few are object selectors (limit data to those matching the specified object), and one is a sort key. Filter-type options are “additive” in that they are combined with logical `AND` when applied to the data. Boolean-type options are only applied when `true`. For example, setting `options.neo = false` simply disables that filter (it does not select non-NEOs).

For additional information, see the [API Documentation](https://ssd-api.jpl.nasa.gov/doc/cad.html)

##### `options` (optional) - **[Object]**
* `date-min` - **[String]** exclude data earlier than this date Must be in the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss` or `now` for the current date. Defaults to `now`
* `date-max` - **[String]** exclude data later than this date Must be in the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss` or `now` for the current date or `+D` for “D” days after now. Defaults to `+60`
* `dist-min` - **[String]** exclude data with an approach distance less than this, e.g., `0.05`, `10LD` (default units: au)
* `dist-max` - **[String]** exclude data with an approach distance greater than this (see `dist-min`)
* `h-min` - **[Number]** exclude data from objects with H-values less than this
* `h-max` - **[Number]** exclude data from objects with H-values greater than this
* `v-inf-min` - **[Number]** exclude data with V-infinity less than this positive value in km/s
* `v-inf-max` - **[Number]** exclude data with V-infinity greater than this positive value in km/s
* `v-rel-min` - **[Number]** exclude data with V-relative less than this positive value in km/s
* `v-rel-max` - **[Number]** exclude data with V-relative greater than this positive value in km/s
* `class` - **[String]** limit data to objects with the specified orbit-class (see list of valid class names below)
* `pha` - **[Boolean]** limit data to PHAs
* `nea` - **[Boolean]** limit data to NEAs
* `comet` - **[Boolean]** limit data to comets
* `nea-coment` - **[Boolean]** limit data to NEAs and comets
* `neo` - **[Boolean]** limit data to NEOs
* `kind` - **[String]** limit data to objects of the specified kind (`a`=asteriod, `an`=numbered-asteroids, `au`=unnumbered-asteroids, `c`=comets, `cn`=numbered-comets, `cu`=unnumbered-comets, `n`=numbered-objects, and `u`=unnumbered-objects)
* `spk` - **[Number]** only show data for the object matching this SPK-ID (e.g., `2000433` )
* `des` - **[String]** only show data for the object matching this designation (e.g., `2015 AB`, `141P` or `433`)
* `body` - **[String]** limit data to close-approaches to the specified body (e.g., `Earth`) or allow all bodies with `ALL` or `*` (see list of valid bodies below)
* `sort` - **[String]** sort data on the specified field: `date`, `dist`, `dist-min`, `v-inf`, `v-rel`, `h`, or `object`. Default sort order is ascending, but you can prepend the value with `-` for descending)
* `limit` - **[Number]** limit data to the first N results (where N is the specified number and must be an integer value greater than zero)
* `fullname` - **[Boolean]** include the full-format object name/designation


##### SBDB Orbit Class Values
Valid class names for the `class` option
* `IEO` - **Atira** - an asteroid orbit contained entirely within the orbit of the Earth (Q < 0.983 AU). Also known as an Interior Earth Object.
* `ATE` - **Aten** - Near-Earth asteroid orbits similar to that of 2062 Aten (a < 1.0 AU; Q > 0.983 AU).
* `APO` - **Apollo** - Near-Earth asteroid orbits which cross the Earth’s orbit similar to that of 1862 Apollo (a > 1.0 AU; q < 1.017 AU).
* `AMO` - **Amor** - Near-Earth asteroid orbits similar to that of 1221 Amor (1.017 AU < q < 1.3 AU).
* `MCA` - **Mars-crossing Asteroid** - asteroids that cross the orbit of Mars constrained by (1.3 AU < q < 1.666 AU; a < 3.2 AU).
* `IMB` - **Inner Main-belt Asteroid** - asteroids with orbital elements constrained by (a < 2.0 AU; q > 1.666 AU).
* `MBA` - **Main-belt Asteroid** - asteroids with orbital elements constrained by (2.0 AU < a < 3.2 AU; q > 1.666 AU).
* `OMB` - **Outer Main-belt Asteroid** - asteroids with orbital elements constrained by (3.2 AU < a < 4.6 AU).
* `TJN` - **Jupiter Trojan** - asteroids trapped in Jupiter’s L4/L5 Lagrange points (4.6 AU < a < 5.5 AU; e < 0.3).
* `CEN` - **Centaur Objects** - objects with orbits between Jupiter and Neptune (5.5 AU < a < 30.1 AU).
* `TNO` - **TransNeptunian Object** - objects with orbits outside Neptune (a > 30.1 AU).
* `PAA` - **Parabolic Asteroid** - asteroids on parabolic orbits (e = 1.0).
* `HYA` - **Hyperbolic Asteroid** - asteroids on hyperbolic orbits (e > 1.0).
* `HYP` - **Hyperbolic Comet** - comets on hyperbolic orbits (e > 1.0).
* `PAR` - **Parabolic Comet** - comets on parabolic orbits (e = 1.0).
* `COM` - **Comet** - comet orbit not matching any defined orbit class.
* `JFC` - **Jupiter-family Comet** - classical definition (P < 20 y).
* `HTC` - **Halley-type Comet** - classical definition (20 y < P < 200 y).
* `ETc` - **Encke-type Comet** - as defined by Levison and Duncan (Tj > 3; a < aJ).
* `CTc` - **Chiron-type Comet** - as defined by Levison and Duncan (Tj > 3; a > aJ).
* `JFc` - **Jupiter-family Comet** - as defined by Levison and Duncan (2 < Tj < 3).

##### Close Approach Bodies
The following bodies may be selected via the `body` query parameter.
* `Merc` - Mercury
* `Venus` - Venus
* `Earth` - Earth
* `Mars` - Mars
* `Juptr` - Jupiter
* `Satrn` - Saturn
* `Urnus` - Uranus
* `Neptn` - Neptune
* `Pluto` - Pluto
* `Moon` - Moon

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

<h3 id='epic-fetch'>EPIC.fetch(type)</h3>

Retrieves a list of the most recent date of natural or enhanced color imagery

##### `type` (required) - **[String]**

Type of color imagery to fetch. Valid types are `natural` and `enhanced`

```javascript
EPIC
  .fetch('natural')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='epic-date'>EPIC.date(type, date)</h3>

Retrieves a list of natural or enhanced color imagery available for the specified date

##### `type` (required) - **[String]**

Type of color imagery to fetch. Valid types are `natural` and `enhanced`

##### `date` (required) - **[String]**

The date of the `natural` or `enhanced` imagery to retrieve. Must be in the format `YYYY-MM-DD`

```javascript
EPIC
  .date('enhanced', '2017-04-10')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='epic-all'>EPIC.all(type)</h3>

Retrieves a list of all dates with available `natural` or `enhanced` imagery

##### `type` (required) - **[String]**

Type of color imagery to fetch. Valid types are `natural` and `enhanced`

```javascript
EPIC
  .all('natural')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='epic-available'>EPIC.available(type)</h3>

Retrieves an alternate listing of all dates with available `natural` or `enhanced` color imagery

##### `type` (required) - **[String]**

Type of color imagery to fetch. Valid types are `natural` and `enhanced`

```javascript
EPIC
  .available('enhanced')
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

<h3 id="sounds-fetch">Sounds.fetch(options)</h3>
Retrieve of list of audio resources containing sounds from space

##### `options` (optional) - **[Object]**
* `q` - **[String]** Search text to filter results
* `limit` - **[Number]** Maximum number of tracks to return. If omitted, all found tracks will be returned.

```javascript
Sounds
	.fetch({
    limit: 5
  })
	.then(data => console.log(data))
	.catch(err => console.log(err));
```
