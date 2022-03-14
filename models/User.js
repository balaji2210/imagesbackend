const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name filed is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email field is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

//validate password
userSchema.methods.isValidPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

//JWT

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
