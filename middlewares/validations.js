const Products = require('../models/Products');
const error = 422;
const ZERO = 0;
const FIVE = 5;

const productExists = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists'
  }
};

const nameTooShort = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long'
  }
};

const quantityTooSmall = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1'
  }
};

const quantityNotNumber = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number'
  }
};

const validateName = async (request, response, next) => {
  const { name } = request.body;
  const getAllProducts = await Products.getAllProducts();
  const notFound = getAllProducts.filter((product) => product.name === name);

  console.log(notFound);

  if (notFound.length > ZERO) return response.status(error).json(productExists);

  if (name.length < FIVE) return response.status(error).json(nameTooShort);

  next();
};

const validateQuantity = (request, response, next) => {
  const { quantity } = request.body;

  if (quantity <= ZERO) return response.status(error).json(quantityTooSmall);

  if (typeof quantity !== 'number') return response.status(error).json(quantityNotNumber);
  
  next();
};

module.exports = {
  validateName,
  validateQuantity,
};
