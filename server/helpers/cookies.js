exports.cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Secure only in production
  sameSite: "strick",
  maxAge: 24 * 60 * 60 * 1000, // Token expires in 1 day
};
