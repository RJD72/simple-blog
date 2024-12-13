// Export a function that takes another function (typically an async function) as input
module.exports = (func) => {
  // Return a new function that takes the usual Express middleware parameters: req, res, next
  return (req, res, next) => {
    // Call the input function with req, res, and next, and catch any errors
    // If an error occurs, pass it to the next middleware (usually the error handler)
    func(req, res, next).catch((err) => next(err));
  };
};
