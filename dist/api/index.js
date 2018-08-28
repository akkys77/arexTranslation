'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

exports.default = function () {
  var api = (0, _express.Router)();

  // mount the facets resource
  // api.use('/facets', facets({ config, db }));

  // perhaps expose some API metadata at the root
  // api.get('/', (req, res) => {
  //   res.json({ version: 'api' });
  // });

  api.get('/', function (req, res) {
    res.json({ 'in': 'translate' });
  });

  return api;
}; // import { version } from '../../package.json';
//# sourceMappingURL=index.js.map