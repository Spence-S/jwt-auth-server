const signin = (req, res, next) => {
  res.json(req.user);
};

export default signin;
