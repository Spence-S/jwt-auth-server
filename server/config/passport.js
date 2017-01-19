import passport from 'passport';
import localStrategy from 'passport-local';
import User from '../models/user';

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ "email" : email })
      .then( user => {
        if(!user){
          return done(null, false, { message: 'Incorrect username.' });
        }
      })
      .catch( err => {
        return done(err);
      })
  }
