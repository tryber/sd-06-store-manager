const { ProductsModel } = require('../models');
const { ObjectId } = require('mongodb');

const status422 = 422;
const minimumSize = 5;
const minimumQnt = 0;

const productExists = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(status422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });

  next();
};

const productValidator = async (req, res, next) => {
  const { name, quantity } = req.body;

  const nameExists = await ProductsModel.getByName(name);
  if (nameExists && name === nameExists.name) return res.status(status422).json({
    err: {
      code: 'invalid_data', message: 'Product already exists'
    }
  });
  if (name.length < minimumSize) return res.status(status422).json({
    err: {
      code: 'invalid_data', message: '"name" length must be at least 5 characters long'
    }
  });
  if (quantity <= minimumQnt) return res.status(status422).json({
    err: {
      code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'
    }
  });
  if (typeof quantity !== 'number') return res.status(status422).json({
    err: {
      code: 'invalid_data', message: '"quantity" must be a number'
    }
  });

  next();
};

const productEditValidator = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (name.length < minimumSize) return res.status(status422).json({
    err: {
      code: 'invalid_data', message: '"name" length must be at least 5 characters long'
    }
  });
  if (quantity <= minimumQnt) return res.status(status422).json({
    err: {
      code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'
    }
  });
  if (typeof quantity !== 'number') return res.status(status422).json({
    err: {
      code: 'invalid_data', message: '"quantity" must be a number'
    }
  });

  next();
};

module.exports = {
  productExists,
  productValidator,
  productEditValidator,
};
