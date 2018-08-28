'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _v = require('./v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  api.get('/', function (req, res) {
    res.json({
      currentVersion: 'v1',
      path: 'api/v1'
    });
  });

  api.use('/v1', (0, _v2.default)());

  return api;
};
//# sourceMappingURL=index.js.map