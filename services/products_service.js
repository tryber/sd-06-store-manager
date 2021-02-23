const products = require('../models/products');

const getAllProducts = async () => {
  return await products.getAll();
};

const createProduct = async (name, quantity) => {
  const FIVE = 5;
  const ZERO = 0;
  const nameExist = await products.findByName(name);

  if(name.length < FIVE) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  };

  if(nameExist) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  };

  if(quantity <= ZERO) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if(typeof quantity !== 'number') {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }

  return await products.create(name, quantity);
};

module.exports = {
  getAllProducts,
  createProduct,
};
