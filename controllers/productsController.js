const express = require('express');

const router = express.Router();

const service = require('./services/productsService');

const StatusCreated = 201;

const UnprocessableEntity = 422;

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

module.exports = router;