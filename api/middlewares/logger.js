module.exports = (req, _res, next) => {
  console.log({
    date: req.requestTime = new Date().toLocaleString(),
    method: req.method,
    route: req.path,
  });

  next();
};
