import { Router } from 'express';
import translate from './translate';

export default () => {
  let api = Router();

  api.get('/', (req, res) => {
    res.json({ version: 'v1' });
  });

  api.post('/translate', translate);

  api.get('/translate', (req, res) => {
    res.status(400).json({ message: 'You should use POST not GET' });
  });

  return api;
};
