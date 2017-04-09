## NASA SDK
NASA API wrapper for Node.js

### Installation
```sh
npm install --save nasa-sdk
```
### Usage
```javascript
import { APOD } from 'nasa-sdk';
```
Only import the modules you need. For example, if you only need the `APOD` and `EONET` modules:
```javascript
import { APOD, EONET } from 'nasa-sdk';
```
To set your API Key, set the environment variable `NASA_API_KEY`. Alternatively, you can set the configuration manually
```javascript
import { setNasaApiKey } from 'nasa-sdk';
setNasaApiKey('<your-api-key>')
```

## APOD
* [APOD.fetch()](#apod-fetch)

- - -
<h3 id='apod-fetch'>Apod.fetch(options)</h3>
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
