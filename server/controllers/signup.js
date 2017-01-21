import { User } from '../models';

const signup = (req, res, next) => {
//for now we simply save the user to the database
//the password is hashed on save
//req.body needs to be validated before saving but
//this is fine for now
  let user = new User(req.body);

  user.save()
    .then( doc => {
      //just return the username and password back
      //Later we will change this to return the jwt token
      res.json({doc});
    })
    .catch( err => {
      //catch any problems saving to database and forward to err handler
      return next(err);
    });
};

export default signup;
