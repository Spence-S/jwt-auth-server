import { User } from '../models';
import jwt from 'jsonwebtoken';
import { secret } from '../config/config';

const signup = (req, res, next) => {
/*for now we simply save the user to the database
the password is hashed on save!

req.body needs to be validated before saving but
this is fine for now

I believe what needs to happen here is that
I save the user then return a jwt that they can send with further
requests
*/


//save user
  let user = new User(req.body);
  user.save()
    .then( user => {
      //just return the username and password back
      //Later we will change this to return the jwt token

      //first pull off the saved email
      let { email } = user;

      //payload = { email: email }
      let payload = { email };

      //create a jwt
      let token = jwt.sign(payload, secret);

      //send token to client
      res.send({token});
    })
    .catch( err => {
      //catch any problems saving to database and forward to err handler
      return next(err);
    });
};



export default signup;
