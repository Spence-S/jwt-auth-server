export const signup = (req, res, next) => {
  res.json({"mesage": "this message is coming from the signup controller"});
};

export const signin = (req, res, next) => {
  res.json({"Message":"You hit the signin route successfully"});
};
