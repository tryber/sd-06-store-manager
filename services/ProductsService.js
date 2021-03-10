const { createProducts, getByNameProducts, 
  getByIdProducts, updateProducts, removeProducts } 
  = require('../models/ProductsModel');
const { ObjectId } = require('mongodb');

const UNPROCESSABLE = 422;
// Magic Number
const MIN_CHARS = 5;
const ZERO = 0;

const createValidation = async (req, res, next) => {
  const { name, quantity } = req.body;
  const findProduct = await getByNameProducts(name);
  // validations
  if (name.length <= MIN_CHARS) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (findProduct) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  if (quantity <= ZERO) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  if (typeof name !== 'string') {
    return res.status(UNPROCESSABLE).json(
      {
        err: {
          code: 'invalid_data',
          message: '"name" must be a string'
        },
      }
    );
  }
  if (!Number.isInteger(quantity)) {
    return res.status(UNPROCESSABLE).json(
      {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        },
      }
    );
  }
  next();
};

const getByIdValidation = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(UNPROCESSABLE).json(
    {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    }
  );
  next();
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
  getByIdValidation,
  updateValidation,
  removeValidation
};
