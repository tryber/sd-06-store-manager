const { Router } = require('express');
const Products = require('../services/ProductService');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { validateProduct } = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const CREATED = 201;

router.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);

  res.status(CREATED).json(newProduct);
}),
);

module.exports = router;
