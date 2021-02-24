const productsModules = require('../modules/productsModules');

const maxLength = 5;
const ZERO = 0;
const invalidData = 422;

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const allProducts = await productsModules.getAllProducts();

  if (name.length <= maxLength) {
    return res.status(invalidData).json( { err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }});
  } else if (typeof name !== String) {
    return res.status(invalidData).json( { err: {
      code: 'invalid_data',
      message: '"name" length must be a string',
    }});
  }

  
  if (allProducts.find((product) => product.name === name) !== undefined) {
    return res.status(invalidData).json( { err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }});
  };

  if (quantity <= ZERO) {
    return res.status(invalidData).json( { err: {
      code: 'invalid_data',
      message: '"quantity" must be larger then or equal to 1',
    }});
  } else if (typeof quantity !== Number) {
    return res.status(invalidData).json( { err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }});
  };

  next();

};

module.exports = {
  validateProduct,
};
