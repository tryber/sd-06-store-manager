const ProductsModels = require('../models/ProductsModels');

const unprocessableEntity = 422;

const registerProduct = async () => {
  return await ProductsModels.RegisterProduct();
};

const validateProduct = async (request, response, next) => {
  const { name, quantity } = request.body;
  const five = 5;

  if(name.length < five) {
    return response.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
    });
  } else if (quantity < 1) {
    return response.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      },
    });
  } else if (typeof quantity !== 'number') {
    return response.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      },
    });
  }

  next();
};

const checkIfNotExist = async (request, response, next) => {
  const { name } = request.body;
  const productList = await ProductsModels.getAllProducts();
  const Exists = await productList.find((product) => product.name === name);

  if (Exists) {
    return response.status(unprocessableEntity).json(
      {
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        },
      }
    );
  }

  next();
};

module.exports = {
  registerProduct,
  validateProduct,
  checkIfNotExist,
};
