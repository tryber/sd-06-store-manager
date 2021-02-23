const products = require('../models/products');

const dataValidate = async (name, quantity) => {
  const productExist = await products.findNameProduct(name);
  const number5 = 5;
  const number0 = 0;

  if (quantity <= number0) return {
    err: {
      message: '"quantity" must be larger than or equal to 1',
      codeStatus: 422,
      code: 'invalid_data'
    }
  };

  if (typeof quantity === 'string') return {
    err: {
      message: '"quantity" must be a number',
      codeStatus: 422,
      code: 'invalid_data'
    }
  };

  if (name.length < number5) return {
    err: {
      message: '"name" length must be at least 5 characters long',
      codeStatus: 422,
      code: 'invalid_data'
    }
  };

  if (productExist) return {
    err: {
      message: 'Product already exists',
      codeStatus: 422,
      code: 'invalid_data'
    }
  };

  return false;
};

const create = async (name, quantity) => {
  const errorMessage = await dataValidate(name, quantity);

  if (errorMessage) return errorMessage;

  const productCreated = await products.create(name, quantity);

  return productCreated;
};

module.exports = {
  create,
};
