const { ObjectId } = require('mongodb');
const { getAllProducts } = require('../modules/productModules');

  const zero = 0;
  const five = 5;
  const fourHundredTwentyTwo = 422;

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const products = await getAllProducts();

  const alreadyExists = await products.find((product) => product.name === name);

  if (alreadyExists) {
    return res.status(fourHundredTwentyTwo).json(
      {
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        },
      }
    );
  }

  if (name.length < five) {
    return res.status(fourHundredTwentyTwo).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
    });
  }
  else if (typeof name !== 'string') {
    return res.status(fourHundredTwentyTwo).json({
      err: {
        code: 'invalid_data',
        message: '"name" must be a string'
      },
    });
  }

  if (typeof quantity !== 'number') {
    return res.status(fourHundredTwentyTwo).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      },
    });
  }
  else if (quantity <= zero) {
    return res.status(fourHundredTwentyTwo).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      },
    });
  }

  next();
};

const validateId = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(fourHundredTwentyTwo).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
  
  next();
}

module.exports = {
  validateProduct,
  validateId,
};
