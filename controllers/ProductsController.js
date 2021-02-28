const { Router } = require('express');
const ProductsService = require('../services/ProductsService');
const {
  checkProductRepetition,
  validateProductName,
  validateProductQuantity,
  validateProductId,
} = require('../middlewares');

const router = Router();
const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router.get('/', async (_request, response) => {
  const products = await ProductsService.getAll();
  response.status(SUCCESS).json(products);
});

router.get('/:id', validateProductId, async (request, response) => {
  const { id } = request.params;
  const requestedProduct = await ProductsService.findById(id);

  if (requestedProduct.err) {
    return response.status(UNPROCESSABLE_ENTITY).json(requestedProduct);
  };

  return response.status(SUCCESS).json(requestedProduct);
});

router.post('/',
  validateProductName,
  validateProductQuantity,
  checkProductRepetition,
  async (request, response) => {
    const { name, quantity } = request.body;
    const registeredProduct = await ProductsService.create(name, quantity);
    response.status(CREATED).json(registeredProduct);
  }
);

router.put('/:id',
  validateProductName,
  validateProductQuantity,
  async (request, response) => {
    const { id } = request.params;
    const { name, quantity } = request.body;
    const updatedProduct = await ProductsService.update(id, name, quantity);

    if (updatedProduct.error) {
      return response.status(updatedProduct.error.code).json(updatedProduct.error);
    }
    response.status(SUCCESS).json(updatedProduct);
  });

router.delete('/:id', validateProductId, async (request, response) => {
  const { id } = request.params;
  const removedProduct = await ProductsService.remove(id);
  if (removedProduct.error) {
    return response.status(removedProduct.error.code).json(removedProduct.error);
  }
  response.status(SUCCESS).json(removedProduct);
});

module.exports = router;
