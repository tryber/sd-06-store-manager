const { Router } = require('express');
const Sales = require('../models/Sales');
const Products = require('../models/Products');
const salesValidation = require('../schemas/salesValidation');

const router = new Router();

const ERROR = 422;
const SUCCESS = 201;
const OK = 200;

const ERROR_MESSAGE = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
};

router.post('/', salesValidation, async (req, res) => {
  try {
    const products = req.body;

    products.forEach(async (product) => {
      const { productId } = product;

      const productExists = await Products.findById(productId);

      if (!productExists) {
        return res.status(ERROR).json(ERROR_MESSAGE);
      }
    });

    const createdSale = await Sales.create(products);

    return res.status(OK).json(createdSale);
  } catch (err) {
    return res.status(ERROR).json(ERROR_MESSAGE);
  }
});

module.exports = router;
