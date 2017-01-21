import express from 'express';
import  { signin, signup } from '../controllers/';
import passport from '../config/passport';

const requireSignin = (req,res,next) => {
  console.log("in the middle")
  passport.authenticate('local', { session: false },
  (err, user, info, status) =>{
    console.log(info);
    if(err){
      return next(err);
    }
    if(!user){
      err= new Error('user not found');
      return next(err)
    };
    req.user=user;
    next()
  })(req,res,next);
};

 const routes = express.Router();
  routes.get('/signin', (req, res) => {
    res.render('signin',{title: "signin"});
  });

  routes.get('/signup', (req, res) => {
    res.render('signup',{title: "signup"});
  })

  routes.post('/signup', signup);

  routes.post('/signin', requireSignin, signin);

  routes.get('/', (req, res) => {
  res.send('Hello there kid! from your friendly neighborhood GET!');
})

export default routes;
