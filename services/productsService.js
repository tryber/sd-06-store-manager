const products = require('../models/products');

const findNameProduct = async (name) => {
  const product = await products.findNameProduct(name);
  return product;
};

const dataValidate = (name, quantity) => {
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

  if (findNameProduct(name)) return {
    err: {
      message: 'Product already exists',
      codeStatus: 422,
      code: 'invalid_data'
    }
  };

  return false;
};

const create = async (name, quantity) => {
  const errorMessage = dataValidate(name, quantity);

  if (errorMessage) return errorMessage;

  const productCreated = await products.create(name, quantity);

  return productCreated;
};

module.exports = {
  create,
};
