const UNPROCESSABLE = 422;
const ZERO = 0;

module.exports = async (req, res, next) => {
  const arraySales = req.body;
  const { quantity } = arraySales[0];

  if (!quantity || (quantity <= ZERO)) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  if (typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  next();
};
