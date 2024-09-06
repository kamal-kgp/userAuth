const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    phone: String,
    password: String,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
