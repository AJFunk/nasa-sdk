## NASA SDK
NASA API wrapper for Node.js

[![Build Status](https://travis-ci.org/AJFunk/nasa-sdk.svg?branch=master)](https://travis-ci.org/AJFunk/nasa-sdk)

This SDK makes it simple to integrate many of NASA's APIs. Some of them require getting an API key from [https://api.nasa.gov](https://api.nasa.gov), which is free and easy. API keys are limited to 1000 requests/hour. We have implemented error checking in order to prevent bad requests being sent to NASA APIs, thus saving you from wasting your requests.

This project has **no dependencies!** and uses modern ES2016+ syntax, which means you can use promises (as shown in the documentation) or async/await.

Our goal is to integrate as many APIs as possible to allow JavaScript developers to easily access information about our planet, solar system, and beyond. If you have any APIs you would like to see added, please let us know by opening an issue!

### Installation
```sh
npm install --save nasa-sdk
```
### Usage
```javascript
import {
  APOD,
  CAD,
  Earth,
  EONET,
  EPIC,
  Fireballs,
  Images,
  MarsPhotos,
  NEO,
  NHATS,
  Patents,
  Scout,
  Sentry,
  Sounds,
} from 'nasa-sdk';
```
Only import the modules you need. For example, if you only need the `APOD` and `EONET` modules:
```javascript
import {
  APOD,
  EONET,
} from 'nasa-sdk';
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

## Earth - Landsat 8 Imagery of Earth
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

## Fireballs - Visible Meteor Events
* [Fireballs.fetch()](#fireballs-fetch)

## Images - NASA Media and Video Assets
* [Images.search()](#images-search)
* [Images.asset()](#images-asset)
* [Images.metadata()](#images-metadata)
* [Images.captions()](#images-captions)

## Mars Photos - Photos from Mars Rovers
* [MarsPhotos.fetch()](#marsphotos-fetch)
* [MarsPhotos.manifest()](#marsphotos-manifest)

## NEO - Near Earth Objects
* [NEO.feed()](#neo-feed)
* [NEO.feedToday()](#neo-feedtoday)
* [NEO.fetch()](#neo-fetch)
* [NEO.browse()](#neo-browse)
* [NEO.stats()](#neo-stats)

## NHATS - Near-Earth Object Human Space Flight Accessible Targets Study
* [NHATS.fetch()](#nhats-fetch)

## Patents - NASA's Patent Portfolio
* [Patents.fetch()](#patents-fetch)

## Scout - Trajectory Analysis and Hazard Assessment for Recently Detected Objects on the Minor Planet Center’s NEOCP
* [Scout.fetch()](#scout-fetch)

## Sentry - Earth Impact Monitoring
* [Sentry.fetch()](#sentry-fetch)

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

Most options are filters effectively limiting the data to those matching the constraints, a few are object selectors (limit data to those matching the specified object), and one is a sort key. Filter-type options are "additive" in that they are combined with logical `AND` when applied to the data. Boolean-type options are only applied when `true`. For example, setting `options.neo = false` simply disables that filter (it does not select non-NEOs).

For additional information, see the [API Documentation](https://ssd-api.jpl.nasa.gov/doc/cad.html)

##### `options` (optional) - **[Object]**
* `date-min` - **[String]** Exclude data earlier than this date Must be in the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss` or `now` for the current date. Defaults to `now`
* `date-max` - **[String]** Exclude data later than this date Must be in the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss` or `now` for the current date or `+D` for "D" days after now. Defaults to `+60`
* `dist-min` - **[String]** Exclude data with an approach distance less than this, e.g., `0.05`, `10LD` (default units: au)
* `dist-max` - **[String]** Exclude data with an approach distance greater than this (see `dist-min`)
* `h-min` - **[Number]** Exclude data from objects with H-values less than this
* `h-max` - **[Number]** Exclude data from objects with H-values greater than this
* `v-inf-min` - **[Number]** Exclude data with V-infinity less than this positive value in km/s
* `v-inf-max` - **[Number]** Exclude data with V-infinity greater than this positive value in km/s
* `v-rel-min` - **[Number]** Exclude data with V-relative less than this positive value in km/s
* `v-rel-max` - **[Number]** Exclude data with V-relative greater than this positive value in km/s
* `class` - **[String]** Limit data to objects with the specified orbit-class (see list of valid class names below)
* `pha` - **[Boolean]** Limit data to PHAs
* `nea` - **[Boolean]** Limit data to NEAs
* `comet` - **[Boolean]** Limit data to comets
* `nea-coment` - **[Boolean]** Limit data to NEAs and comets
* `neo` - **[Boolean]** Limit data to NEOs
* `kind` - **[String]** Limit data to objects of the specified kind (`a`=asteriod, `an`=numbered-asteroids, `au`=unnumbered-asteroids, `c`=comets, `cn`=numbered-comets, `cu`=unnumbered-comets, `n`=numbered-objects, and `u`=unnumbered-objects)
* `spk` - **[Number]** Only show data for the object matching this SPK-ID (e.g., `2000433` )
* `des` - **[String]** Only show data for the object matching this designation (e.g., `2015 AB`, `141P` or `433`)
* `body` - **[String]** Limit data to close-approaches to the specified body (e.g., `Earth`) or allow all bodies with `ALL` or `*` (see list of valid bodies below)
* `sort` - **[String]** Sort data on the specified field: `date`, `dist`, `dist-min`, `v-inf`, `v-rel`, `h`, or `object`. Default sort order is ascending, but you can prepend the value with `-` for descending. Default value is `-date`
* `limit` - **[Number]** Limit data to the first N results (where N is the specified number and must be an integer value greater than zero)
* `fullname` - **[Boolean]** Include the full-format object name/designation


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
CAD
  .fetch({
    // prop names with hyphens require quotes
    'date-min': '2015-04-03',
    'date-max': '+20',
    body: 'Satrn',
  })
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

<h3 id='fireballs-fetch'>Fireballs.fetch(options)</h3>

Get a list of Fireball events and their associated data. Be sure to reference the [API Documentation](https://ssd-api.jpl.nasa.gov/doc/fireball.html) for more information on Fireballs.

##### `options` (required) - **[Object]**
* `date-min` - **[String]** exclude data earlier than this date. Must be in `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss` format
* `date-max` - **[String]** exclude data later than this date. Must be in `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss` format
* `energy-min` - **[Number]** exclude data with total-radiated-energy less than this positive value in joules ×1010 (e.g., `0.3` = 0.3×1010 joules)
* `energy-max` - **[Number]** exclude data with total-radiated-energy greater than this (see `energy-min`)
* `impact-e-min` - **[Number]** exclude data with estimated impact energy less than this positive value in kilotons (kt) (e.g., `0.08` kt)
* `impact-e-max` - **[Number]** exclude data with total-radiated-energy greater than this (see impact-e-min)
* `vel-min` - **[Number]** exclude data with velocity-at-peak-brightness less than this positive value in km/s (e.g., `18.5`)
* `vel-max` - **[Number]** exclude data with velocity-at-peak-brightness greater than this positive value in km/s (e.g., `20`)
* `alt-min` - **[Number]** exclude data from objects with an altitude less than this
* `alt-max` - **[Number]** exclude data from objects with an altitude greater than this
* `req-loc` - **[Boolean]** location (latitude and longitude) required; when set to `true`, exclude data without a location
* `req-alt` - **[Boolean]** altitude required; when set to `true`, exclude data without an altitude
* `req-vel` - **[Boolean]** velocity required; when set to `true`, exclude data without a velocity
* `req-vel-comp` - **[Boolean]** velocity components required; when set to `true`, exclude data without velocity components
* `sort` - **[String]** sort data on the specified field: `date`, `energy`, `impact-e`, `vel`, or `alt`. Default sort order is ascending, but you can prepend the value with `-` for descending. Default value is `-date`
* `limit` - **[Number]** limit data to the first N results (where N is the specified number and must be an integer value greater than zero)
* `fullname` - **[Boolean]** include the full-format object name/designation

```javascript
Fireballs
  .fetch({
    // prop names with hyphens require quotes
    'date-min': '2015-04-03',
    'req-loc': true
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='images-search'>Images.search(options)</h3>

Retrieves results and information on how to retrieve more details on images taken by astronauts. For additional information, the [API Documentation](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)

 ##### `options` (required) - **[Object]** Atleast one option property is required, but all individual options are optional
 * `q` - **[String]** Free text search terms to compare to all indexed metadata
 * `center` - **[String]** NASA center which published the media
 * `description` - **[String]** Terms to search for in `Description` fields
 * `keywords` - **[String]** Terms to search for in `Keywords` fields. Separate multiple values with commas
 * `location` - **[String]** Terms to search for in `Location` fields
 * `media_type` - **[String]** Media types to restrict the search to. Available types: [`image`, `audio`]. Separate multiple values with commas
 * `nasa_id` - **[String]** The media asset’s NASA ID
 * `photographer` - **[String]** The primary photographer’s name
 * `secondary_creator` - **[String]** A secondary photographer/videographer’s name
 * `title` - **[String]** Terms to search for in `Title` fields
 * `year_start` - **[String]** The start year for results. Must be in `YYYY` format
 * `year_end` - **[String]** The end year for results. Must be in `YYYY` format

 ```javascript
Images
  .search({
    q: 'Apollo 11',
    description: 'moon landing',
    media_type: 'image',
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='images-asset'>Images.asset(nasaId)</h3>
Get a media asset's manifest for the given NASA ID

##### nasaId (required) - **[String]** The media asset’s NASA ID

```javascript
Images
  .asset('as11-40-5874')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='images-metadata'>Images.metadata(nasaId)</h3>
Get a media asset's metadata location for the given NASA ID

##### nasaId (required) - **[String]** The media asset’s NASA ID

```javascript
Images
  .metadata('as11-40-5874')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id='images-captions'>Images.captions(nasaId)</h3>
Get a video asset's captions location for the given NASA ID

##### nasaId (required) - **[String]** The media asset’s NASA ID

```javascript
Images
  .captions('172_ISS-Slosh')
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

<h3 id="nhats-fetch">NHATS.fetch(options)</h3>

Retrieve of list of Near-Earth Asteroids (NEAs) that might be accessible by future human space flight missions.

The NHATS API employs various "modes" to obtain required data. This results in restrictions on the combination of options you can use in a single request. For detailed information on this, refer the the [API Documentation](https://ssd-api.jpl.nasa.gov/doc/nhats.html)

##### `options` (optional) - **[Object]**
* `dv` - **[Number]** Minimum total delta-V (km/s). Allowed values are `4`, `5`, `6`, `7`, `8`,
`9`, `10`, `11`, `12`. Default value is `12`
* `dur` - **[Number]** Minimum total duration (days). Allowed values are `60`, `90`, `120`, `150`, `180`, `210`, `240`, `270`, `300`, `330`, `360`, `390`, `420`, `450`. Default value is `450`
* `stay` - **[Number]** Minimum stay (days). Allowed values are `8`, `16`, `24`, `32`. Default is `8`
* `launch` - **[String]** Launch window (year range). Allow values are `2015-2020`, `2020-2025`, `2025-2030`, `2030-2035`, `2035-2040`, `2015-2040`
* `h` - **[Number]** Object’s maximum absolute magnitude, H (mag). Allowed values are `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `30`
* `occ` - **[Number]** Object’s maximum orbit condition code (OCC). Allowed values are `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`
* `spk` - **[Number/String]** Select data for the object matching this SPK-ID (e.g., `2000433`).
* `des` - **[String]** Select data for the object matching this designation (e.g., `2015 AB`, `141P`, or `433`)
* `plot` - **[Boolean]** Include base-64 encoded plot image file content via output field `plot_base64`

```javascript
NHATS
  .fetch({
    dv: 5,
    plot: true,
  })
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

<h3 id="scout-fetch">Scout.fetch(options)</h3>

Returns a list of Near-Earth Objects (NEOs) with trajectory analysis and hazard assessment for recently detected objects on the Minor Planet Center’s Near-Earth Object Confirmation Page (NEOCP).

The Scout API employs various "modes" to obtain required data. This results in restrictions on the combination of options you can use in a single request. For detailed information on this, refer the the [API Documentation](https://ssd-api.jpl.nasa.gov/doc/scout.html)

##### `options` (optional) - **[Object]**
* `tdes` - **[String]** Select data for the NEOCP object matching this temporary designation (e.g., `P10uUSw`)
* `plot` - **[String]** Get plot files for the specified NEOCP object of the selected type (`el`=elements, `ca`=close-approach, `sr`=systematic-ranging). Multiple values may be passed with a `:` delimiter. For example, `ca:el`. Results are Base64-encoded image data.
* `file` - **[String]** Get the list of available data files (when file=`list`) or get the requested data file for the specified NEOCP object.
* `orbits` - **[Boolean]** Get sampled orbits data for the specified NEOCP object
* `n-orbits` - **[Number]** Limit the number of sampled orbits to this value. Must be in the range `[1:1000]`
* `eph-start` - **[String]** Get the ephemeris for the specified NEOCP object at this time UTC. See API Docs for valid Date/Time formats
* `eph-stop` - **[String]** Set the ephemeris stop-time (if specified, requires `eph-start` and must be later than `eph-start`). See API Docs for valid Date/Time formats
* `eph-step` - **[String]** Set the ephemeris step-size (if specified, requires both `eph-start` and `eph-stop`; if not specified, set to the span). Valid formats are `#d`, `#h`, `#m` (where `#` is a positive definite integer)
* `obs-code` - **[String]** Get the ephemeris for the specified NEOCP object relative to the specified MPC observatory code. Must be a valid MPC code
* `fov-diam` - **[Number]** Specify the size (diameter) of the field-of-view in arc-minutes. Must be in the range `(0:1800]`
* `fov-ra` - **[String]** Specify the field-of-view center (R.A. component) [requires `fov-diam` and `fov-dec`; invalid if `eph-stop` is set]. See API Docs for valid formats
* `fov-dec` - **[String]** specify the field-of-view center (Dec. component) [requires `fov-diam` and `fov-ra`; invalid if `eph-stop` is set]. See API Docs for valid formats
* `fov-vmag` - **[Number]** Filter ephemeris results to those with V-magnitude of this value or brighter [requires `fov-diam`]. Must be in the range `[0:40]`


```javascript
Scout
  .fetch({
    plot: 'el',
    orbits: true,
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<h3 id="sentry-fetch">Sentry.fetch(options)</h3>

Returns a list of Near-Earth Asteroids (NEAs) that could potentially impact the Earth in the next 100 years.

The Sentry API employs various "modes" to obtain required data. This results in restrictions on the combination of options you can use in a single request. For detailed information on this, refer the the [API Documentation](https://ssd-api.jpl.nasa.gov/doc/sentry.html)

##### `options` (optional) - **[Object]**
* `spk` - **[Number]** Select data for the object matching this SPK-ID (e.g., `2029075` )
* `des` - **[String]** Select data for the object matching this designation (e.g., `29075` or `2000 SG344`) [Note: basename-form may also be used, e.g., `a29075` or `2000sg344`]
* `h-max` - **[Number]** Limit data to those with an absolute magnitude, H (weighted-mean for mode-S) less than or equal to this value. Accepted range is [-10:100]
* `ps-min` - **[Number]** Limit data to those with a (weighted-mean for mode-S) Palermo scale (PS) greater than or equal to this value. Accepted range is [-20:20]
* `ip-min` - **[Number]** Limit data to those with a (weighted-mean for mode-S) impact-probability (IP) greater than or equal to this value. Accepted range is [1:1e^-10]
* `days` - **[Number]** Number of days since last observation: limit data to those objects that have been observed within the specified number of days (if the number is negative, limit data to those which have not been observed with the specified number of days). Accepted values meet the criterion `ABS(days) > 6`
* `all` - **[Boolean]** Request the complete VI data set
* `removed` - **[Boolean]** Request the list of removed objects

```javascript
Sentry
  .fetch({
    all: true
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
