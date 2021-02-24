const { Router } = require('express');
const ProductsService = require('../service/ProductsService');
const { validateProduct, validateName } = require('../middlewares/ProductsMid.js');
const router = Router();
const SUCCESS = 201;

router.post('/', validateProduct, validateName, async (req, res) => {
  const { name, quantity } = req.body;
  const productCreated = await ProductsService.createProductService(name, quantity);
  res.status(SUCCESS).json(productCreated);
});

module.exports = router;
