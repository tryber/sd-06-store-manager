const Products = require('../models/products');

const productValidation = async(req, res, next) => {
  const { name, quantity } = req.body;
  
  const UNPROCESSABLEENTITY = 422;

  const FIVE = 5;
  const ONE = 1;

  const productExists = await Products.findByName(name);
  
  if(name.length < FIVE) {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }

  if(productExists) {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }

  if(quantity < ONE) {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }

  if(typeof quantity === 'string') {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }

  next();
};

module.exports = {
  productValidation
};
