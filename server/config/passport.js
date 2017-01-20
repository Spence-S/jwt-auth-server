import passport from 'passport';
import localStrategy from 'passport-local';
import { User } from '../models';

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email })
    .then( user =>{
      if (!user) { return done(null, false); }
      // compare passwords - is `password` equal to user.password?
      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }

        return done(null, user);
      });
    })
    .catch( err => {
        return done(err);
    });
