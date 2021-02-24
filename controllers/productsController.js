const { Router } = require('express');
const productsService = require('../services/productsService');

const router = Router();

const OK = 200;
const CREATED = 201;

router.get('/', async (_req, res) => {
  const allProducts = await productsService.getAllProducts();

  res.status(OK).json(allProducts);
});

router.post('/', productsService.productValidation, async (req, res) => {
  const { name, quantity } = req.body;

  const { insertedId } = await productsService.createNewProduct(name, quantity);

  const product = {
    _id: insertedId,
    name,
    quantity
  };

  res.status(CREATED).json(product);
});


module.exports = router;
