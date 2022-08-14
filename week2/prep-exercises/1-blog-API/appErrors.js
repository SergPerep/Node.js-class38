// Use these to specify behavior of custom error handler middleware
class AppError extends Error {
  constructor(message = "Internal server error", statusCode = 500) {
    super(message); 
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
  }
}