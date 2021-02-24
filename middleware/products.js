const { getProductsByName } = require('../models/products');
const ZERO = 0;
const status422 = 422;
const CINCO = 5;

const verifyProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  if(name.length < CINCO) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if(quantity <= ZERO) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  if(!Number.isInteger(quantity)) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const productByName = await getProductsByName(name);
  if (productByName) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      },
    });
  }
  next();
};

module.exports = verifyProduct;
