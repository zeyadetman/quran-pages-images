const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: "Please enter a valid email",
    },
  },
  password: { type: String, required: true },
});

userSchema.methods.generateAuth = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.SECRET_KEY
  );

  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
