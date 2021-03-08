const service = require('../services/productsService');
const { 
  SUCCESS,
  CREATED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_ERROR
} = require('../dictionary/statusCode');
const { productDuplicated, wrongIdFormat } = require('../dictionary/errorMessages');

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
      ...wrongIdFormat
    });
  }

  return res.status(SUCCESS).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdated = await service.updateProductInfo(id, name, quantity);

  return res.status(SUCCESS).json(productUpdated);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await service.deleteProductInfo(id);

  return res.status(SUCCESS).json(deletedProduct);
};

module.exports = {
  createNewProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};