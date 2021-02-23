const model = require('../models/productsModel');

const MINIMUM_LENGTH = 5;

const MINIMUM_QUANTITY = 0;

const validations = async (name, quantity) => {

  const doesTheProductExist = await model.getAProductByName({ name });

  if (doesTheProductExist) {
    throw { 
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  }

  if (name.length < MINIMUM_LENGTH) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (quantity <= MINIMUM_QUANTITY) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (!Number(quantity)) {
    throw {
      err: {
        statusCode: 422,
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }
};

const createANewProduct = async (name, quantity) => {

  await validations(name, quantity);
  
  return model.createAProduct(name, quantity);
};

module.exports = {
  createANewProduct,
};