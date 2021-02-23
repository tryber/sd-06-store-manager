const products = require('../models/products');

const dataValidate = (name, quantity) => {

  const number5 = 5;
  const number0 = 0;

  if (name.length < number5) return {
    err: {
      message: '"name" length must be at leats 5 characters long',
      codeStatus: 422,
      code: 'invalid_data'
    }
  };
  // como validar se é unico? acredito que teria que percorrer o banco de dados e comparar com name
  // if (array.find(element => element = name)) return {
  //   err: {
  //     message: 'Product already exists',
  //     codeStatus: 422,
  //     code: 'invalid_data'
  //   }
  // }

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

  return false;
};

const create = async (name, quantity) => {
  const errorMessage = dataValidate(name, quantity);

  if (errorMessage) return errorMessage;

  const productCreated = await products.create(name, quantity);

  return productCreated;

  // return false;
};

module.exports = {
  create,
};
