import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import { secret } from './config';
import { User } from '../models';
import bcrypt from 'bcryptjs';

// Create local strategy
const localOpts = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOpts, (email, password, done) => {
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

  //Create JWT Strategy
  const jwtOpts = {
      secretOrKey : secret,
      jwtFromRequest : ExtractJwt.fromAuthHeader(),
  };
  const JwtLogin = new jwtStrategy(jwtOpts, (payload, done) => {
    User.findOne({email: payload.email})
    .then((err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
          return  done(null, user);
        } else {
          return  done(null, false);
        }
    })
    .catch( err => {
      console.log(err);
    });
  });

passport.use(localLogin);
passport.use(JwtLogin);

export default passport;
