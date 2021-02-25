const INTERNAL_SERVER_ERROR = 500;
const UNPROCESSABLE_ENTITY = 422;

module.exports = (error, _request, response, _next) => {
  const { err } = error || undefined;
  
  if (err) {
    return response.status(UNPROCESSABLE_ENTITY).json({ err });
  }
  response.status(INTERNAL_SERVER_ERROR).json({ code: 'server_error' });
};