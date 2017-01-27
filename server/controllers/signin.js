import jwt from 'jsonwebtoken';

const signin = (req, res, next) => {

 console.log('im in siginin');
  //here we want to verify the json webtoken supplied
  res.json(req.user);
};

export default signin;
