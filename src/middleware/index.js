import { Router } from 'express';

export default ({ config }) => {
  let routes = Router();

  // add middleware here
  // eslint-disable-next-line no-console
  console.log('in middleware !!!');
  return routes;
};
