const service = require('../services/productsService');
const { SUCCESS, CREATED, UNPROCESSABLE_ENTITY } = require('./statusCode');

const createNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  if (!service.nameValidation(name)) {
    return next({
      statusCode: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    });
  }

  if(!Number.isInteger(quantity)) {
    return next({
      statusCode: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message:  '"quantity" must be a number'
    });
  }

  if (!service.quantityValidation(quantity)) { 
    return next({
      statusCode: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message:  '"quantity" must be larger than or equal to 1'
    });
  }
  
  const productCreated = await service.createProduct(name, quantity);

  if (productCreated === false) {
    return next({
      statusCode: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message:  'Product already exists'
    });
  }

  return res.status(CREATED).json(productCreated);
};

const getAll = async (_req, res) => {
  const allProducts = await service.allProducts();

  return res.status(SUCCESS).send(allProducts);
};

const findById = async (req, res) => {
  const { id } = req.params;
};

module.exports = {
  createNewProduct,
  getAll,
  findById,
};