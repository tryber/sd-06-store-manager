module.exports = (err, _req, res, _next) => {
  const error = (typeof err === 'string') ? err : err.message;
  const { message, status, code } = JSON.parse(error);
  res.status(status).json({
    err: { code, message }
  });
};
