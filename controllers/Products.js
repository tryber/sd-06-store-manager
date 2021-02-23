const { Router } = require('express');
const { createProduct } = require('../models/Products');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = Router();

const SUCCESS = 200;
const CREATED = 201;
const DFT_ERROR = 400;

router.post('/', validateNewProduct, async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await createProduct({ name, quantity });

  return res.status(CREATED).send(newProduct);
});

module.exports = router;
