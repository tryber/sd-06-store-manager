const Products = require('../services/ProductService');

const UNPROCESSABLE = 422;
const FIVE = 5;
const ZERO = 0;

module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (!quantity || quantity <= ZERO) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (!name || typeof name !== 'string' || name.length < FIVE) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  const checkName = await Products.getName(name);

  if (checkName) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  next();
};
