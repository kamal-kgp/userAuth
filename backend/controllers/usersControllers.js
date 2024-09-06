const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "kamal4tec@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Click the link below to verify your email:</p>
               <a href="http://localhost:3000/user/verify/${token}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    throw new Error(
      "Failed to send verification email. Please try again later."
    );
  }
};

const validatePassword = (password) => {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return regex.test(password);
};

module.exports = { sendVerificationEmail, validatePassword };
