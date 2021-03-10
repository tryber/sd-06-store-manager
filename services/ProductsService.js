const { createProducts, getByNameProducts, getAllProducts, 
  getByIdProducts, updateProducts, removeProducts } 
  = require('../models/ProductsModel');
const { ObjectId } = require('mongodb');

const UNPROCESSABLE = 422;
// Magic Number
const MIN_CHARS = 5;
const ZERO = 0;

const createValidation = async (name, quantity) => {
  const findProduct = await getByNameProducts(name);
  // validations
  if (name.length <= MIN_CHARS) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      code: UNPROCESSABLE
    };
  }
  if (findProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
      code: UNPROCESSABLE
    };
  }
  if (quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      code: UNPROCESSABLE
    };
  }
  if (isNaN(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      code: UNPROCESSABLE
    };
  }

  const insert = await createProducts(name, quantity);
  return { code: 201, insert };
};

const getAllValidation = async () => {
  const getAll = await getAllProducts();
  return { code: 200, getAll }; 
};

const getByIdValidation = async (id) => {
  // Validations
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      code: UNPROCESSABLE
    };
  }
  const item = await getByIdProducts(id);
  if(!item) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      code: UNPROCESSABLE
    };
  }
  return { code: 200, item };
};

const updateValidation = async (id, name, quantity) => {
  // Validations
  if (name.length <= MIN_CHARS) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
      code: UNPROCESSABLE
    };
  }
  if (quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      },
      code: UNPROCESSABLE
    };
  }
  if (isNaN(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      },
      code: UNPROCESSABLE
    };
  }

  await updateProducts(id, name, quantity);
  const update = await getByIdProducts(id);
  return { code: 200, update };
};

const removeValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      code: UNPROCESSABLE
    };
  }
  const remove = await getByIdProducts(id);
  await removeProducts(id);
  return {code: 200, remove};
};

module.exports = {
  createValidation,
  getAllValidation,
  getByIdValidation,
  updateValidation,
  removeValidation
};
