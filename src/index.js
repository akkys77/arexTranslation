import http from 'http';
import express from 'express';
import path from 'path';

// 3rd PArty modules
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import favicon from 'serve-favicon';

// Own modules
import config from './config';
import api from './api';
import middleware from './middleware';

let app = express();
app.server = http.createServer(app);

//logger
app.use(morgan('dev'));
// eslint-disable-next-line no-console
console.log(config);

app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// internal middleware
app.use(middleware({ config }));

// serve favicon
app.use(favicon(path.join(__dirname, '/', 'favicon.png')));

// api router
app.use('/api', api());
//  custom 404 Not Found
app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.server.listen(process.env.PORT || config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${app.server.address().port}`);
});

export default app;
