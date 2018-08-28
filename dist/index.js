'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 3rd PArty modules
var app = (0, _express2.default)();

// Own modules

app.server = _http2.default.createServer(app);

//logger
app.use((0, _morgan2.default)('dev'));
// eslint-disable-next-line no-console
console.log(_config2.default);

app.use((0, _cors2.default)({
  exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));

// internal middleware
app.use((0, _middleware2.default)({ config: _config2.default }));

// api router
app.use('/api', (0, _api2.default)({ config: _config2.default }));
app.server.listen(process.env.PORT || _config2.default.port, function () {
  // eslint-disable-next-line no-console
  console.log('Server running on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map