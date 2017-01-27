import jwt from 'jsonwebtoken';

const signin = (req, res, next) => {
  

  //here we want to verify the json webtoken supplied
  res.json(req.user);
};

export default signin;
