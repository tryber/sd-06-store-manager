const { 
  createProduct,
  updateProduct,
  getProductCount, 
  getAllProducts, 
  getProductById,
  deleteProduct 
} = require('../models/ProductModel');

const { ObjectId } = require('mongodb');

const STATUS_UNPROCESSABLE= 422;
const MIN_LENGTH = 5;
const ZERO = 0;

const createValidation = async (name, quantity) => {
  const countProduct = await getProductCount(name);
  if (name.length <= MIN_LENGTH) {
    return { 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
      code: 422
    };
  } 
  if (countProduct > ZERO) {
    return { 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      },
      code: 422
    };
  }
  if (quantity <= ZERO) {
    return { 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      },
      code: 422
    };
  }
  if (isNaN(quantity)) {
    return { 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      },
      code: 422
    };
  }
  const create = await createProduct(name, quantity);
  return { code: 201, create };
};

const getValidation = async () => {
  const getAll = await getAllProducts();
  return { code: 200, getAll };
};

const getByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { 
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      code: 422
    };
  }
  const getById = await getProductById(id);
  if (!getById) {
    return { 
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      code: 422
    };
  }
  return { code: 200, getById };
};

const editValidation = async (id, name, quantity) => {
  if (name.length <= MIN_LENGTH) {
    return { 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
      code: 422
    };
  }
  if (quantity <= ZERO) {
    return { 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      },
      code: 422
    };
  }
  if (isNaN(quantity)) {
    return { 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      },
      code: 422
    };
  }
  await updateProduct(id, name, quantity);
  const update = await getProductById(id);
  return { code: 200, update };
};

const deleteValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { 
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      code: 422
    };
  }
  const exclude = await getProductById(id);
  await deleteProduct(id);
  return {code: 200, exclude};
};

module.exports = {
  createValidation,
  getValidation,
  getByIdValidation,
  editValidation,
  deleteValidation
};
