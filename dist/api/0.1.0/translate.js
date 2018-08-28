'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

// import facets from './facets';

exports.default = function (_ref) {
  var config = _ref.config;

  var api = (0, _express.Router)();

  // mount the facets resource
  // api.use('/facets', facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', function (req, res) {
    res.json({ 'in the': 'api' });
  });

  return api;
}; // import { version } from '../../package.json';
//# sourceMappingURL=translate.js.map