import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

// GET USER INFO
export const getUserController = async (req, res) => {
  try {
    // find user by id
    const user = await userModel.findById(req.body.id).select("-password");
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // hide password
    user.password = undefined;
    // response
    res.status(200).send({
      success: true,
      message: "User Found",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get User API",
      error,
    });
  }
};

// UPDATE USER PROFILE
export const updateUserController = async (req, res) => {
  try {
    // Find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // update user
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // save user
    await user.save();
    // response
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update User API",
      error,
    });
  }
};

// UPDATE USER PASSWORD
export const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword, answer } = req.body;
    // validation
    if (!oldPassword || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old Password And New Password",
      });
    }
    // check password match
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old Password",
      });
    }
    // hashing update password
    var salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    // save user
    await user.save();
    // response
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update Password API",
      error,
    });
  }
};

// RESET PASSWORD
export const resetPasswordController = async (req, res) => {
  try {
    // get data
    const { email, newPassword, answer } = req.body;
    // validation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email, New Password, Answer",
      });
    }
    // find user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      // response
      return res.status(500).send({
        success: false,
        message: "Invalid Email Or Answer",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // update password
    user.password = hashedPassword;
    // save user
    await user.save();
    // response
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Reset Password API",
      error,
    });
  }
};

// DELETE PROFILE ACCOUNT
export const deleteProfileController = async (req, res) => {
  try {
    // find user
    await userModel.findByIdAndDelete(req.params.id);
    // response
    res.status(200).send({
      success: true,
      message: "Profile Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Profile API",
      error,
    });
  }
};
