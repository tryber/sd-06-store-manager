const express = require('express');

const router = express.Router();

const service = require('../services/productsService');

const StatusCreated = 201;

const UnprocessableEntity = 422;

const OK = 200;

const INTERNAL_SERVER_ERROR = 500;

router.post('/', async (request, response) => {
  try {
  
    const { name, quantity } = request.body;

    const product = await service.createANewProduct(name, quantity);

    return response.status(StatusCreated).json(product);
  
  } catch (error) {

    if (error.err.code === 'invalid_data') {
      response.status(UnprocessableEntity).json(error);
    }
  }
});

router.get('/', async (_request, response) => {

  const products = await service.getAllProducts();
  
  return response.status(OK).json({ products });
});

router.get('/:id', async (request, response) => {

  try {
    const { id } = request.params;

    const product = await service.getAProductById(id);

    response.status(OK).json(product);

  } catch (error) {

    if (error.err.code === 'invalid data') {
      return response.status(UnprocessableEntity).json(error);
    }

    console.error(error);

    response.status(UnprocessableEntity).json(error);
  }
});

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { name, quantity } = request.body;

    const updatedProduct = await service.updateAProduct(id, name, quantity);

    return response.status(OK).json(updatedProduct);

  } catch (error) {
    if (error.err.code === 'invalid data') {

      return response.status(UnprocessableEntity).json(error);
    }

    console.error(error);

    response.status(UnprocessableEntity).json(error);
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const removedProduct = await service.removeAProduct(id);

    response.status(OK).json(removedProduct);

  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return response.status(UnprocessableEntity).json(error);
    }

    console.error(error);
    
    response.status(INTERNAL_SERVER_ERROR).json({ message: error });
  }
});

module.exports = router;