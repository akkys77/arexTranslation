'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

exports.default = function () {
  var routes = (0, _express.Router)();

  // add middleware here
  // eslint-disable-next-line no-console
  console.log('in middleware !!!');
  return routes;
};
//# sourceMappingURL=index.js.map