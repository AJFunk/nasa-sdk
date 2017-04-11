'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = epic;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function epic() {
  function validateType(type) {
    var validTypes = ['natural', 'enhanced'];
    var i = validTypes.indexOf(type.toLowerCase());
    return i === -1 ? '' : validTypes[i];
  }

  return {
    fetch: function fetch(type) {
      var deferred = _q2.default.defer();

      if (!type) return (0, _util.handleError)('Image quality type is required', deferred);
      var validType = validateType(type);
      if (!validType) return (0, _util.handleError)('Invalid image quality type', deferred);

      (0, _util.sendRequest)('https://api.nasa.gov/EPIC/api/' + validType, {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    date: function date(type, _date) {
      var deferred = _q2.default.defer();

      if (!type) return (0, _util.handleError)('Image quality type is required', deferred);
      var validType = validateType(type);
      if (!validType) return (0, _util.handleError)('Invalid image quality type', deferred);
      if (!_date) return (0, _util.handleError)('date is required', deferred);
      if (!(0, _util.validateDate)(_date)) return (0, _util.handleError)('date must be in "YYYY-MM-DD" format', deferred);

      (0, _util.sendRequest)('https://api.nasa.gov/EPIC/api/' + type + '/date/' + _date, {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    all: function all(type) {
      var deferred = _q2.default.defer();

      if (!type) return (0, _util.handleError)('Image quality type is required', deferred);
      var validType = validateType(type);
      if (!validType) return (0, _util.handleError)('Invalid image quality type', deferred);

      (0, _util.sendRequest)('https://api.nasa.gov/EPIC/api/' + type + '/all', {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    },
    available: function available(type) {
      var deferred = _q2.default.defer();

      if (!type) return (0, _util.handleError)('Image quality type is required', deferred);
      var validType = validateType(type);
      if (!validType) return (0, _util.handleError)('Invalid image quality type', deferred);

      (0, _util.sendRequest)('https://api.nasa.gov/EPIC/api/' + type + '/available', {}, function (err, data) {
        if (err) return (0, _util.handleError)(err, deferred);
        return deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];