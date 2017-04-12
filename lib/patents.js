'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = patents;

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function patents() {
  return {
    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new _promise2.default(function (resolve, reject) {
        return (0, _util.sendRequest)('api.nasa.gov', '/patents/content', options, function (err, data) {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    }
  };
}
module.exports = exports['default'];