const { Router } = require('express');
const {
  validateName,
  validateProduct,
  validateId
} = require('../middlewares/ProductsMid');
const {
  createProductService,
  getAllProductsService,
  getByIdService,
  editProductService,
  deleteProductService,
} = require('../service/ProductsService');
const router = Router();
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE = 422;
router.post('/', validateProduct, validateName, async (req, res) => {
  const { name, quantity } = req.body;
  const productCreated = await createProductService(name, quantity);
  return res.status(CREATED).json(productCreated);
});
router.get('/', async (req, res) => {
  const getAll = await getAllProductsService();
  return res.status(SUCCESS).json({ products: getAll });
});
router.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const product = await getByIdService(id);
  return res.status(SUCCESS).json(product);
});
router.put('/:id', validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const productEdited = await editProductService(id, name, quantity);
  return res.status(SUCCESS).json(productEdited);
});
router.delete('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteProductService(id);
  if (!deleted) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: 'Wrong id format'
  }});
  return res.status(SUCCESS).json(deleted);
});
module.exports = router;
