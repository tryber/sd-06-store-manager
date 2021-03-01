const { Router } = require('express');
const Products = require('../services/ProductService');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { validateProduct, validateId } = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;

router.post('/', validateProduct, rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const newProduct = await Products.create(name, quantity);

  response.status(CREATED).json(newProduct);
}),
);

module.exports = router;
