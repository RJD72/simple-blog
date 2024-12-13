const User = require("../models/UserModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const util = require("util");

// Middleware to protect routes and validate user authentication
const verifyToken = asyncErrorHandler(async (req, res, next) => {
  // Get the cookie from the authorization header
  const cookies = req.headers.cookie;

  let token;

  if (cookies) {
    // Extract the token from the cookie
    const match = cookies.split("; ").find((c) => c.startsWith("token="));
    if (match) {
      token = match.split("=")[1];
    }
  }
  if (!token) {
    return next(new CustomError("You are not logged in", 401));
  }

  try {
    // Verify the token
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    // Check if the user with the decoded ID still exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return next(new CustomError("User does not exist", 401));
    }

    // Check if the user changed password after the token was issued
    //   const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
    //   if (isPasswordChanged) {
    //     const error = new CustomError("User changed password", 401);
    //     return next(error);
    //   }

    // Allow access to the route
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(new CustomError("Token has expired", 401));
    }
    return next(new CustomError("Invalid token", 401));
  }
});

module.exports = verifyToken;
