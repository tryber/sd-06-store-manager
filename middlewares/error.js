module.exports = (err, req, res, next) => {
  const INTERNAL_ERROR = 500;
  
  console.error({ err });

  res.status(err.statusCode || INTERNAL_ERROR).json({err});
};