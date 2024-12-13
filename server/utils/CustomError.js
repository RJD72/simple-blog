// Define a custom error class that extends the built-in Error class
class CustomError extends Error {
  constructor(message, statusCode) {
    // Call the parent Error constructor with the provided message
    super(message);

    // Set the status code for the error
    this.statusCode = statusCode;

    // Set the status based on the status code (fail for 4xx, error for others)
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    // Mark the error as operational (useful for distinguishing between expected and unexpected errors)
    this.isOperational = true;

    // Capture the stack trace to help with debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the CustomError class for use in other parts of the application
module.exports = CustomError;
