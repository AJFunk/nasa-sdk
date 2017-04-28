// @flow
import {
  handleResult,
  sendRequest,
  validateDate,
  validateDateTime,
} from './util';

export default function cad(): Object {
  function validateClass(className: String): boolean {
    const validClasses = [
      'IEO', 'ATE', 'APO', 'AMO', 'MCA', 'IMB', 'MBA', 'OMB', 'TJN', 'CEN', 'TNO',
      'PAA', 'HYA', 'HYP', 'PAR', 'COM', 'JFC', 'HTC', 'ETc', 'CTc', 'JFc',
    ];
    return validClasses.indexOf(className) === -1;
  }

  function validateBody(body: String): boolean {
    const validBodies = [
      'merc', 'venus', 'earth', 'mars', 'juptr', 'satrn', 'urnus', 'neptn', 'pluto', 'moon',
    ];
    return validBodies.indexOf(body.toLowerCase()) === -1;
  }


  return {

    fetch: (options: Object = {}): Promise<any> =>
      new Promise((resolve: (data: Object) => void, reject: (reason: Error) => void): mixed => {
        const optionOverrides = {};
        if (options.hasOwnProperty('date-min')) {
          if (!validateDate(options['date-min']) && !validateDateTime(options['date-min'])) {
            if (options['date-min'] !== 'now') {
              return reject(new Error('date-min is not in a valid format.'));
            }
          }
        }
        if (options.hasOwnProperty('date-max')) {
          if (!validateDate(options['date-max']) && !validateDateTime(options['date-max'])) {
            if (options['date-max'].match(/^[+]\d+$/)) {
              optionOverrides['date-max'] = options['date-max'].replace(/[+]/, '%2B');
            } else if (options['date-max'] !== 'now') {
              return reject(new Error('date-max is not in a valid format.'));
            }
          }
        }
        if (options.hasOwnProperty('class')) {
          if (!validateClass(options.class)) return reject(new Error('Invalid class value'));
        }
        if (options.hasOwnProperty('body')) {
          if (!validateBody(options.body)) return reject(new Error('Invalid body value'));
        }
        return sendRequest(
          'ssd-api.jpl.nasa.gov',
          '/cad.api',
          Object.assign({}, options, optionOverrides),
          resolve,
          reject,
          handleResult,
          true
        );
      }),

  };
}
