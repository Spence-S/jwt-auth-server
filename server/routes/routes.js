import express from 'express';
import  { signin, signup } from '../controllers/';


 const routes = express.Router();
  routes.get('/signin', (req, res) => {
    res.render('signin',{title: "signin"});
  });

  routes.get('/signup', (req, res) => {
    res.render('signup',{title: "signup"});
  })

  routes.post('/signup', signup);

  routes.post('/signin', signin);

  routes.get('/', (req, res) => {
  res.send('Hello there kid! from your friendly neighborhood GET!');
})

export default routes;
