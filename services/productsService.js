const products = require('../models/products');
const { ObjectId } = require('mongodb');

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

const getAll = async () => {
  const result = await products.getAll();

  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };

  const result = await products.getById(id);

  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };

  return result;
};

const upDate = async (id, name, quantity) => {
  const errorMessage = await dataValidate(name, quantity);

  if (errorMessage) return errorMessage;

  const productUpdated = await products.upDate(id, name, quantity);

  return productUpdated;
};

const exclude = async (id) => {
  const result = await products.exclude(id);

  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  upDate,
  exclude,
};
