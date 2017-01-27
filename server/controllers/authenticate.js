import passport from '../config/passport';

export const signinAuth = (req,res,next) => {
  console.log("in the middle");
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
