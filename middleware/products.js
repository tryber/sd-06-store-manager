const { getProductsByName } = require('../models/products');

const verifyProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  if(name.length < 5) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if(quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  if(!Number.isInteger(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const productByName = await getProductsByName(name);
  if (productByName) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      },
    });
  }
  next();
};

module.exports = verifyProduct;
