const BAD_REQUEST = 400;

class AppError {
  constructor({ message, code }, status = BAD_REQUEST) {
    this.message = message;
    this.code = code;
    this.status = status;
  }
}

module.exports = AppError;
