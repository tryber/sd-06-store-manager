const { create, update, exclude } = require('../models/ProductModel');
const { getProductCount, getAll, getById } = require('../models/ProductModel');
const { ObjectId } = require('mongodb');

const STATUS_UNPROCESSABLE= 422;
const MIN_LENGTH = 5;
const ZERO = 0;

const createValidation = async (name, quantity) => {
  const countProduct = await getProductCount(name);
  if (name.length <= MIN_LENGTH) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  } 
  if (countProduct > ZERO) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  if (quantity <= ZERO) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }  
  if (isNaN(quantity)) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }
  
  return await create(name, quantity);
};

const getValidation = async () => {
  await getAll();
};

const getByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }});
  }
  const product = await getById(id);
  if (!product) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }});
  }
};

const editValidation = async (id, name, quantity) => {
  if (name.length <= MIN_LENGTH) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  if (quantity <= ZERO) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }  
  if (isNaN(quantity)) {
    return res.status(STATUS_UNPROCESSABLE).json({ 
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }
  await update(id, name, quantity);
  return await getById(id);
};

const deleteValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }});
  }
  const deletedProduct = await getById(id);
  await exclude(id);
  return deletedProduct;
};

module.exports = {
  createValidation,
  getValidation,
  getByIdValidation,
  editValidation,
  deleteValidation
};
