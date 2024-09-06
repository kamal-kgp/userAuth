const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendVerificationEmail =
  require("../controllers/usersControllers").sendVerificationEmail;
const validatePassword =
  require("../controllers/usersControllers").validatePassword;

// Endpoint to handle registration
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, country, phone, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists." });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and contain at least one numeric digit and one special character.",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let securedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      country,
      phone,
      password: securedPassword,
      isVerified: false,
      verificationToken: crypto.randomBytes(32).toString("hex"),
    });

    await newUser.save();

    await sendVerificationEmail(email, newUser.verificationToken);

    res.status(200).json({
      message: "Registration successful! Please check your email to verify.",
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

// Endpoint to handle email verification
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: "Invalid verification token." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res
      .status(200)
      .json({ message: "Email verified successfully! You can now log in." });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify email. Please try again." });
  }
});

//Endpoint to handle login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: "Please verify your email first" });
    }

    console.log(user._id.toString());
    res
      .status(200)
      .json({ message: "Login successful!", userID: user._id.toString() });
  } catch (error) {
    res.status(500).json({ error: "Login failed. Please try again" });
  }
});

//Endpoint to resend verification email
router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found. Please register first" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ error: "User already verified. Log in again" });
    }

    const newVerificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = newVerificationToken;
    await user.save();

    await sendVerificationEmail(user.email, newVerificationToken);

    res
      .status(200)
      .json({ success: true, message: "Verification email resent." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error. Please try again" });
  }
});

//Endpoint to get user details
router.get("/get-details/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "firstName lastName email country phone"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error, please try again" });
  }
});

//Endpoint to update user details
router.put("/update-details/:id", async (req, res) => {
  const { firstName, lastName, email, country, phone } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let newEmail = false;

    if (email !== user.email) {
      user.verificationToken = crypto.randomBytes(32).toString("hex");
      user.isVerified = false;
      newEmail = true;
      await sendVerificationEmail(email, user.verificationToken);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.country = country || user.country;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      message: "User data updated successfully",
      emailChanged: newEmail,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error, please try again" });
  }
});

//Endpoint to change user password
router.put("/update-password/:id", async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and contain at least one numeric digit and one special character.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error, please try again" });
  }
});

module.exports = router;
