const Products = require('../models/Products');
const error = 422;
const ZERO = 0;
const FIVE = 5;
const TWEENTYFOUR = 24;

const messageError = (string) => {
  return {
    err: {
      code: 'invalid_data',
      message: string,
    }
  };
};

const validateName = async (request, response, next) => {
  const { name } = request.body;
  const getAllProducts = await Products.getAllProducts();
  const notFound = getAllProducts.filter((product) => product.name === name);

  if (notFound.length > ZERO) return response
    .status(error).json(messageError('Product already exists'));

  if (name.length < FIVE) return response
    .status(error).json(messageError('"name" length must be at least 5 characters long'));

  next();
};

const validateQuantity = (request, response, next) => {
  const { quantity } = request.body;

  if (quantity <= ZERO) return response
    .status(error).json(messageError('"quantity" must be larger than or equal to 1'));

  if (typeof quantity !== 'number') return response
    .status(error).json(messageError('"quantity" must be a number'));
  
  next();
};

const validateId = (request, response, next) => {
  const { id } = request.params;

  if (id.length < TWEENTYFOUR) return response
    .status(error).json(messageError('Wrong id format'));

  next();
};

module.exports = {
  validateName,
  validateQuantity,
  validateId,
};
