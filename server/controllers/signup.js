import { User } from '../models';

const signup = (req, res, next) => {

  let user = new User(req.body);

  user.save()
    .then( doc => {
      res.json({doc});
    })
    .catch( err => {
      return next(err);
    });


};

export default signup;
