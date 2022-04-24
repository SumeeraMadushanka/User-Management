const User = require("../models/auth");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//when we use asynchronous function we need try catch block
exports.register = async (req, res) => {
  //controller for register
  const {
    firstName,
    lastName,
    password,
    telephoneNumber,
    nicNumber,
    emailAddress,
  } = req.body; //destructur e method

  try {
    const user = await User.create({
      firstName,
      lastName,
      telephoneNumber,
      nicNumber,
      emailAddress,
      password,
    });

    sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Already have an account using this email ";
      return res.status(400).json({ success: false, error: message });
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

exports.login = async (req, res) => {
  //controller for login
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    //backend validation
    return res
      .status(400)
      .json({ success: false, error: "Please enter email and password" });
  } //400 Bad Request

  try {
    const user = await User.findOne({ emailAddress }).select("+password"); //match two passwords

    if (!user) {
      //true
      return res.status(401).json({
        success: false,
        available: "User does not exists. Please create an account !",
      });
    }

    const isMatch = await user.matchPasswords(password); //matching the passwords from the received from request and from the db

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      // 500 internal server error
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = async (req, res) => {
  //controller for forgot password
  const { emailAddress } = req.body;

  try {
    const user = await User.findOne({ emailAddress }); //check for email availability for sending emails

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Email could not be sent" });
    }

    const resetToken = user.getResetPasswordToken(); // get the password reset token

    await user.save();

    const resetURL = `http://localhost:3000/passwordreset/${resetToken}`; //setting a URL to send to the user for emails

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this URL to reset password</p>
        <a href=${resetURL} clicktracking=off>${resetURL}</a>
         `;
    try {
      await sendEmail({
        //send email
        to: user.emailAddress,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, verify: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res
        .status(500)
        .json({ success: false, error: "Email could not be sent" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res) => {
  //controller for reset password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex"); //create a hash code using crypto

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, //find and update the relavant database field
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Reset Token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, verify: "Password reset success" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

const sendToken = (user, statusCode, res) => {
  //JWT get
  const token = user.getSignedToken();
  const firstName = user.firstName;
  const lastName = user.lastName;
  const telephoneNumber = user.telephoneNumber;
  const nicNumber = user.nicNumber;
  const emailAddress = user.emailAddress;
  const id = user._id;
  res
    .status(200)
    .json({
      success: true,
      token,
      firstName,
      emailAddress,
      lastName,
      nicNumber,
      telephoneNumber,
      id
    });
};
