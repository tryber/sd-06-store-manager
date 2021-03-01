const INTERNAL_ERROR = 500;

module.exports = (err, _request, response, _next) => {
  console.error(err);
  response.status(INTERNAL_ERROR).json({ message: err.message });
};
