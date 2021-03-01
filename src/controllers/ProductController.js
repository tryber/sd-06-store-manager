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

router.get('/', rescue(async (request, response) => {
  const allProducts = await Products.getAll();
  response.status(SUCCESS).json({products: allProducts});
}),
);

router.get('/:id', validateId, rescue(async (request, response) => {
  const { id } = request.params;

  const allProducts = await Products.getById(id);

  if (!allProducts) {
    return response.status(UNPROCESSABLE).json(
      {err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }}
    );
  }

  response.status(SUCCESS).json(allProducts);
}),
);


module.exports = router;
