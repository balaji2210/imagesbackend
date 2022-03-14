const User = require("../models/User");
const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.signUp = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!(email || name || password)) {
    return next(new CustomError("Please Send All Fields", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res);
});

exports.signIn = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isValid = await user.isValidPassword(password);

  if (!isValid) {
    return next(new CustomError("Invalid Email or Password", 400));
  }

  cookieToken(user, res);
});

exports.signOut = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: "Logout Success",
  });
});
