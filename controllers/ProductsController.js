const { Router } = require('express');
const { createProductService,
  getAllProductsServices,
  getByIdServices } = require('../service/ProductsService');
const { validateName,
  validateProduct,
  validateId } = require('../middlewares/productsMid');

const router = Router();
const SUCESS = 201;
const OK = 200;

router.post('/', validateProduct, validateName, async (req, res) => {
  const { name, quantity } = req.body;

  const productCreated = await createProductService(name, quantity);

  return res.status(SUCESS).json(productCreated);
});

router.get('/', async (_req, res) => {
  const allProducts = await getAllProductsServices();
  console.log(allProducts);

  return res.status(OK).json(allProducts);
});

router.get('/:id', validateId, async(req, res) => {
  const { id } = req.params;

  const productById = await getByIdServices(id);

  return res.status(OK).json({ products: productById});
});

module.exports = router; 