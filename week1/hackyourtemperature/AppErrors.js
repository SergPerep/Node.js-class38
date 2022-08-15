export class AppError extends Error {
  constructor(message = "Internal Server Error", statusCode = 500) {
    super(message, statusCode);
    this.name = "AppError";
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.message = message;
    this.statusCode = 404;
  }
}