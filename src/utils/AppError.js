class AppError {
  constructor({ message, code }, statusCode) {
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
