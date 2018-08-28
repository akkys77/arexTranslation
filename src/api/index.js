// import { version } from '../../package.json';
import { Router } from 'express';
import translate from './translate';

export default () => {
  let api = Router();

  // api.get('/', (req, res) => {
  //   res.json({ path: 'api' });
  // });

  api.get('/translate/:term', translate);

  api.get('/translate', (req, res) => {
    res.status(422).json({ message: 'missing term to trnaslate in Pig Latin' });
  });

  return api;
};
