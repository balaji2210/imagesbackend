const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/customError");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new CustomError("Login To access", 400));
  }
  const decoed = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoed.id);
  req.user.password = undefined;
  next();
});
