const User = require("../models/UserModel");
const CustomError = require("../utils/CustomError");
const Joi = require("joi");
const uploadImage = require("../utils/uploadImage");

/**
 * Retrieves user details based on the provided token from cookies.
 *
 * @async
 * @function userDetails
 * @param {Object} req - The request object containing the HTTP request data.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a promise that resolves to void.
 *
 * @throws {Error} Throws an error if the user details cannot be retrieved, resulting in a 500 status response with an error message.
 */
// Asynchronous function to handle user details retrieval based on a token from cookies
exports.getLoggedUserProfile = (req, res) => {
  try {
    // Since the protect middleware attaches the user to req.user, we can use it here
    res.status(200).json({
      message: "User profile details",
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the user profile",
      error: true,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userUpdate = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: userUpdate,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "User successfully updated!",
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: true,
    });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const imageFile = req.file;

    const imageUrl = await uploadImage(imageFile);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile_pic: imageUrl.secure_url },
      { new: true }
    );

    res.status(201).json({
      message: "User profile picture updated successfully",
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.author);

    if (!user) {
      return next(CustomError("User not found", 404));
    }

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(CustomError("Unauthorized!", 403));
  }

  try {
    const startIndex = +req.query.startIndex || 0;
    const limit = +req.query.limit || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.role !== "admin" && req.user.id !== req.params.id) {
    return next(new CustomError("Unauthorized!", 403));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
