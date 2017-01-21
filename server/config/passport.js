import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models';
import bcrypt from 'bcryptjs';

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email })
    .then( user =>{
        if (!user) {
          let err = new Error('user not found!')
          err.status=401;
          return done(err);
        }
        bcrypt.compare(password, user.password, (err, res)=>{
          if (err) {
            err.message = "Password compare failure, try again";
            return done(err);
          }
          if (!res) {
            let pwerr =new Error("password do not match")
            pwerr.status = 401;
            return done(pwerr);
          }
          return done(null, user);
        });
    }).catch( err => {
        return done(err);
    });
  });

passport.use(localLogin);

export default passport;
