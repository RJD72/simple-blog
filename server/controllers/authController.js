const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookies = require("../helpers/cookies");
const customError = require("../utils/CustomError");
const authSchema = require("../joiSchemas/authSchema");
const CustomError = require("../utils/CustomError");
const xss = require("xss");

exports.register = async (req, res, next) => {
  try {
    // Validate input shape and format
    const validatedData = await authSchema.userSchema.validateAsync(req.body);

    // Sanitize fields prone to XSS
    validatedData.username = xss(validatedData.username);
    validatedData.email = xss(validatedData.email);
    validatedData.password = xss(validatedData.password);
    validatedData.confirmPassword = xss(validatedData.confirmPassword);

    // Destructure the user's details (name, email, password) from the validatedData object
    const { username, email, password, confirmPassword, terms } = validatedData;

    if (!terms) {
      return next(
        new CustomError("You must agree to the terms and conditions", 403)
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        error: true,
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        error: true,
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: savedUser,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json({ message: error.details[0].message, error: true });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

exports.login = async (req, res) => {
  try {
    const validatedData = await authSchema.loginSchema.validateAsync(req.body);

    validatedData.email = xss(validatedData.email);
    validatedData.password = xss(validatedData.password);

    const { email, password } = validatedData;

    // Find the user by email in the database
    const user = await User.findOne({ email }).select("+password");

    // If no uer, return a 404 error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(404)
        .json({ message: "Invalid email or password", error: true });
    }

    // Check if secret key is missing
    if (!process.env.SECRET_KEY || process.env.SECRET_KEY.trim() === "") {
      throw new Error("Secret key is missing or invalid.");
    }

    // Prepare token data with user id and email
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    // Sign a new JWT token with the tokenData
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    // Set cookie options for the token
    const cookieOptions = cookies.cookieOptions;

    // Return a successful response with the token set in a cookie
    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "Logged in successfully",
      userId: user._id,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // Set cookie options to invalidate the token
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      expires: new Date(0),
    };

    // Destroy the session if using express-session or similar
    if (req.session) {
      return req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to log out",
            error: true,
          });
        }
        return res.cookie("token", "", cookieOptions).status(200).json({
          message: "Logged out successfully",
          success: true,
        });
      });
    }

    // Clear the token cookie
    return res.cookie("token", "", cookieOptions).status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    // Catch any potential errors and return a 500 Internal Server Error response
    return res.status(500).json({
      message: error.message || error, // Send the error message if one occurs
      error: true, // Set an error flag in the response
    });
  }
};

exports.google = async (req, res, next) => {
  const { email, name, image, terms } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const tokenData = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
        algorithm: "HS256",
      });

      // Set cookie options for the token
      const cookieOptions = cookies.cookieOptions;

      const { password, ...rest } = user._doc;

      res.status(200).cookie("token", token, cookieOptions).json(rest);
    } else {
      if (!terms) {
        return next(
          new customError("You must agree to the terms and conditions", 403)
        );
      }
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profile_pic: image,
      });
      await newUser.save();
      const tokenData = {
        id: newUser._id,
        email: newUser.email,
      };
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
        algorithm: "HS256",
      });
      const cookieOptions = cookies.cookieOptions;
      const { password, ...rest } = newUser._doc;
      res.status(201).cookie("token", token, cookieOptions).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
