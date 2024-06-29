import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// Description: This file contains the auth controller functions.
export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered please login",
      });
    }
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email Or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found ",
      });
    }
    //check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};
