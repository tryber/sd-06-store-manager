const model = require('../models/productsModel');

const { ObjectId } = require('mongodb');

const MINIMUM_LENGTH = 5;

const MINIMUM_QUANTITY = 0;

const validations = async (name, quantity, requestType) => {

  if (requestType === 'create') {

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

  await validations(name, quantity, 'create');

  const newProduct = model.createAProduct(name, quantity);
  
  return newProduct;
};

const getAllProducts = async () => {

  const products = await model.getAllProducts();

  return products;
};

const getAProductById = async (id) => {

  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }

  const product = await model.getAProductById(id);

  if (!product) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const updateAProduct = async (id, name, quantity) => {
  
  await validations(name, quantity, 'update');

  const updatedProduct = await model.updateAProduct(id, name, quantity);

  return updatedProduct;
};

module.exports = {
  createANewProduct,
  getAllProducts,
  getAProductById,
  updateAProduct
};