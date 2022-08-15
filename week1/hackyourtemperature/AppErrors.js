export class AppError extends Error {
  constructor(message = "Internal Server Error", statusCode = 500) {
    super(message, statusCode);
    this.name = "AppError";
    this.message = message;
    this.statusCode = statusCode;
  }
}