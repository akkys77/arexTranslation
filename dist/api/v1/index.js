'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _translate = require('./translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var api = (0, _express.Router)();

  api.get('/', function (req, res) {
    res.json({ version: 'v1' });
  });

  api.post('/translate', _translate2.default);

  api.get('/translate', function (req, res) {
    res.status(400).json({ message: 'You should use POST not GET' });
  });

  return api;
};
//# sourceMappingURL=index.js.map