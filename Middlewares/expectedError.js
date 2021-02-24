const expectedError = (error, _req, res, _next) => {
  const { status, err } = error; 
  return res.status(status).send({ err });
};
module.exports = {
  expectedError 
};