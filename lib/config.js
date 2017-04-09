"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apiKey = process.env.NASA_API_KEY;
var setNasaApiKey = function setNasaApiKey(key) {
  exports.apiKey = apiKey = key;
  return null;
};

exports.apiKey = apiKey;
exports.setNasaApiKey = setNasaApiKey;