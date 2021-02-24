const { Router } = require('express');
const rescue = require('express-rescue');
const Sales = require('../models/Sales');
const Products = require('../models/Products');
const salesValidation = require('../schemas/salesValidation');

const router = new Router();

const ERROR = 422;
const NOT_FOUND = 404;
const SUCCESS = 201;
const OK = 200;

const ERROR_MESSAGE = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
};

const SALE_NOT_FOUND = {
  err: { code: 'not_found', message: 'Sale not found' },
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

router.get('/', rescue(async (req, res) => {
  const fetchedSale = await Sales.getAll();

  return res.status(OK).json({ sales: fetchedSale });
}));

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const fetchedSale = await Sales.findById(id);

    if (!fetchedSale) {
      return res.status(NOT_FOUND).json(SALE_NOT_FOUND);
    }

    return res.status(OK).json(fetchedSale);
  } catch (err) {
    return res.status(NOT_FOUND).json(SALE_NOT_FOUND);
  }
});

module.exports = router;
