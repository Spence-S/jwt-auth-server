import express from 'express';
import * as controller from '../controllers/signup';

 const routes = express.Router();
  routes.post('/signup', controller.signup);
  routes.post('/signin', controller.signin);
  routes.get('/', (req, res) => {
  res.send('Hello there you fucking cock sucker!');
})

export default routes;
