import { Router } from 'express';
import v1 from './v1';

export default () => {
  let api = Router();

  api.get('/', (req, res) => {
    res.json({
      currentVersion: 'v1',
      path: 'api/v1'
    });
  });

  api.use('/v1', v1());

  return api;
};
