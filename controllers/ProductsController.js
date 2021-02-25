const { Router } = require('express');
const ProductsService = require('../service/ProductsService');
const {
  validateProduct,
  validateName,
  getByIdMid
} = require('../middlewares/ProductsMid.js');
const router = Router();
const SUCCESS = 201;
const ALLSUCCESS = 200;

router.post('/', validateProduct, validateName, async (req, res) => {
  const { name, quantity } = req.body;
  const productCreated = await ProductsService.createProductService(name, quantity);
  return res.status(SUCCESS).json(productCreated);
});

router.get('/', async (req, res) => {
  const allProducts = await ProductsService.getAllProductsServices();
  return res.status(ALLSUCCESS).json(allProducts);
});

router.get('/:id', getByIdMid, async (req, res) => {
  const { id } = req.params;
  const idProduct = await ProductsService.getIdProduct(id);
  return res.status(ALLSUCCESS).json(idProduct);
});

module.exports = router;
