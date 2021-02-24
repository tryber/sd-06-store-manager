const { Router } = require('express');
const { createProductService } = require('../service/ProductsService');
const { validateName, validateProduct } = require('../middlewares/productsMid');

const router = Router();
const SUCESS = 201;

router.post('/', validateProduct, validateName, async (req, res) => {
  const { name, quantity } = req.body;

  const productCreated = await createProductService(name, quantity);

  return res.status(SUCESS).json(productCreated);
});

module.exports = router; 