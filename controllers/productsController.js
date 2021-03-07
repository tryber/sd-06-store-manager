const service = require('../services/productsService');
const { SUCCESS, CREATED, UNPROCESSABLE_ENTITY } = require('../dictionary/statusCode');
const { productDuplicated } = require('../dictionary/errorMessages');

const createNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body; 
  const productCreated = await service.createProduct(name, quantity);

  if (productCreated === 'duplicated') 
    return next({ statusCode: UNPROCESSABLE_ENTITY, ...productDuplicated });

  return res.status(CREATED).json(productCreated.info);
};

const getAll = async (_req, res) => {
  const allProducts = await service.allProducts();

  return res.status(SUCCESS).json({ products: allProducts });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await service.productById(id);

  if (!product) {
    return next({
      statusCode: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: 'Wrong id format'
    });
  }

  return res.status(SUCCESS).json(product);
};

module.exports = {
  createNewProduct,
  getAll,
  getById,
};