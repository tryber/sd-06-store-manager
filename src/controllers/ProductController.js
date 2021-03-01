const { Router } = require('express');
const Products = require('../services/ProductService');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { validateProduct, validateId } = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;

router.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);

  res.status(CREATED).json(newProduct);
}),
);

router.get('/', rescue(async (_req, res) => {
  const allProducts = await Products.getAll();
  res.status(SUCCESS).json({products: allProducts});
}),
);

router.get('/:id', validateId, rescue(async (req, res) => {
  const { id } = req.params;

  const allProducts = await Products.getById(id);

  if (!allProducts) {
    return res.status(UNPROCESSABLE).json(
      {err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }}
    );
  }

  res.status(SUCCESS).json(allProducts);
}),
);

module.exports = router;
