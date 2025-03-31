const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailutil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "secret";

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hashedPassword;

    const createdUser = await userModel.create(req.body);
    await mailutil.sendingMail(
      createdUser.email,
      "Welcome",
      "This is the email content..."
    );
    res.status(201).json({
      message: "User created..",
      data: createdUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error..", data: err });
  }
};
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const foundUserFromEmail = await userModel
    .findOne({ email: email })
    .populate("roleId");
  console.log(foundUserFromEmail);
  if (foundUserFromEmail != null) {
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    if (isMatch == true) {
      res.status(200).json({
        message: "login successfully..",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid credential..",
      });
    }
  } else {
    res.status(404).json({
      message: "error...",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .populate("roleId stateId cityId areaId");
    console.log(res.data);

    res.status(200).json({
      message: "Get all users..",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    res
      .status(200)
      .json({ message: "User fatched successfully...", data: foundUser });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted...",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const foundUser = await userModel.findOne({ email: req.body.email });
    console.log(foundUser);
    if (foundUser) {
      const token = jwt.sign(foundUser.toObject(), secret);
      console.log(token);
      const url = `http://localhost:5173/createnewpassword/${token}`;
      const mailContent = `<html>
                            <a href="${url}">reset password</a>
                          </html>`;
      await mailutil.sendingMail(
        foundUser.email,
        "reset password",
        mailContent
      );
      res.status(200).json({
        message: "reset password link sent to mail.",
      });
    } else {
      res.json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.password;

    const userFromToken = jwt.verify(token, secret);
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
      password: hashedPassword,
    });
    res.status(201).json({
      message: "password updated successfully..",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
  forgotPassword,
  resetPassword,
};
