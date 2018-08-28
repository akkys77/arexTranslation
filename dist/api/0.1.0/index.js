'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _translate = require('./0.1.0/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import facets from './facets';

// import { version } from '../../package.json';
exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // mount the facets resource
  // api.use('/facets', facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', function (req, res) {
    res.json({ version: 'v0.1.0' });
  });

  return api;
};
//# sourceMappingURL=index.js.map