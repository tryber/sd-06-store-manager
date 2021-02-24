const auditInitialRequest = (req, _res, next) => {
  console.log(`REQUEST: ${req.method} ${req.url}`);
  next();
};

module.exports = { auditInitialRequest };
