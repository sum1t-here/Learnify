import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendmail.util.js";
import crypto from "crypto";

const cookieoptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
};

export const register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return next(new AppError("Fill in all the details to register"));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("Email already exists", 400));
    }

    const user = await User.create({
      fullname,
      email,
      password,
      avatar: {
        publicId: email,
        secureURL:
          "https://www.pikpng.com/pngvi/iTmixmw_person-business-avatar-anonymous-png-image-person-black/",
      },
    });

    if (!user) {
      return next(new AppError("User not created, Please try again", 500));
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.avatar.publicId = result.public_id;
          user.avatar.secureURL = result.secure_url;

          // remove file from the folder
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (err) {
        return next(
          new AppError(err || "File not uploaded, please try again", 500)
        );
      }
    }

    await user.save();

    user.password = undefined;

    const token = await user.generateJWTtoken();

    res.cookie("token", token, cookieoptions);

    res.status(201).json({
      success: true,
      message: "User Registered successfully !!!",
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Registration failed !!!",
      error: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return next(new AppError("Fill in all the details to login", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.comparePassword) {
      return next(new AppError("Email or password doesnot match", 400));
    }

    const token = await user.generateJWTtoken();
    user.password = undefined;

    res.cookie("token", token, cookieoptions);

    res.status(201).json({
      success: true,
      message: "User logged in successfully!!",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Login failed !!!",
      err: err.message,
    });
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Logged out successfully !!!",
    });
  } catch (err) {
    return next(new AppError("Failed to logout", 400));
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const Id = req.user.id;
    const user = await User.findById(Id);

    res.status(201).json({
      success: true,
      message: "User detail",
      user,
    });
  } catch (err) {
    return next(new AppError("Failed to fetch user details !!!", 404));
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 404));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Email not registered", 404));
  }

  const resetToken = await user.generatePasswordResetToken();

  // saving the forgot password token to db
  await user.save();

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const subject = "Reset Password";
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email} successfully`,
    });
  } catch (err) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    return next(
      new AppError(
        err.message || "Something went wrong, please try again.",
        500
      )
    );
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  if (!password) {
    return next(new AppError("Password is required", 400));
  }

  console.log(forgotPasswordToken);

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() }, // $gt will help us check for greater than value, with this we can check if token is valid or expired
  });

  if (!user) {
    return next(
      new AppError("Token is invalid or expired, please try again", 400)
    );
  }

  // Update the password if token is valid and not expired
  user.password = password;

  // making forgotPassword* valus undefined in the DB
  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;

  // Saving the updated user values
  await user.save();

  // Sending the response when everything goes good
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user; // because of the middleware isLoggedIn

    // Check if the values are there or not
    if (!oldPassword || !newPassword) {
      return next(
        new AppError("Old password and new password are required", 400)
      );
    }

    // Finding the user by ID and selecting the password
    const user = await User.findById(id).select("+password");

    // If no user then throw an error message
    if (!user) {
      return next(new AppError("Invalid user id or user does not exist", 400));
    }

    // Check if the old password is correct
    const isPasswordValid = await user.comparePassword(oldPassword);

    // If the old password is not valid then throw an error message
    if (!isPasswordValid) {
      return next(new AppError("Invalid old password", 400));
    }

    // Setting the new password
    user.password = newPassword;

    // Save the data in DB
    await user.save();

    // Setting the password undefined so that it won't get sent in the response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProfile = async (req, res, next) => {
  const { fullname } = req.body;
  const { id } = req.user.id;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("Invalid user id or user does not exist"));
  }

  if (fullname) {
    user.fullname = fullname;
  }

  if (req.file) {
    // Deletes the old image uploaded by the user
    await cloudinary.v2.uploader.destroy(user.avatar.publicId);
  }

  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "lms",
      height: 250,
      gravity: "faces",
      crop: "fill",
    });

    if (result) {
      user.avatar.publicId = result.public_id;
      user.avatar.secureURL = result.secure_url;
      fs.rm(`uploads/${req.file.filename}`);
    }
  } catch (error) {
    return next(
      new AppError(error || "File not uploaded, please try again", 400)
    );
  }
  // Save the user object
  await user.save();

  res.status(200).json({
    success: true,
    message: "User details updated successfully",
  });
};
