const AppError = require('../utils/AppError');

const SERVER_ERROR = 500;

function errorHandling(err, req, res, _next) {
  if (err instanceof AppError) {
    console.log(`${req.method} ${req.url} ${err.statusCode}, error: ${err.message}`);
    return res.status(err.statusCode).json({ err: {
      message: err.message,
      code: err.code
    }});
  }

  console.log(`${req.method} ${req.url} ${SERVER_ERROR}, error: ${err.toString()}`);
  return res.status(SERVER_ERROR).json({ err: {
    message: 'Internal Server Error',
    code: 'internal_server_error'
  }});
}

module.exports = errorHandling;
