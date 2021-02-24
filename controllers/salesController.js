const express = require('express');

const router = express.Router();

const service = require('../services/salesService');

const OK = 200;

const NOT_FOUND = 404;

const INTERNAL_SERVER_ERROR = 500;

const UnprocessableEntity = 422;

router.get('/', async (_request, response) => {
  const sales = await service.getAllSales();

  return response.status(OK).json({ sales });
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const sale = await service.getASaleById(id);

    response.status(OK).json(sale);
  } catch (error) {
    if (error.err.code === 'not_found') {
      return response.status(NOT_FOUND).json(error);
    }

    console.error(error);

    response.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

router.post('/', async (request, response) => {
  try {
    const { body } = request;

    const newSale = await service.createASale(body);
    
    response.status(OK).json(newSale);
  } catch (error) {

    if (error.err.code === 'invalid_data') {
      return response.status(UnprocessableEntity).json(error);
    }

    console.error(error);

    response.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { body } = request;

  try {
    const updatedSale = await service.updateASale(id, body);

    return response.status(OK).json(updatedSale);

  } catch (error) {

    console.log(error.message);

    if (error.err.code === 'invalid_data') {
      return response.status(UnprocessableEntity).json(error);
    }

    response.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {

    const removedSale = await service.removeASale(id);

    return response.status(OK).json(removedSale);

  } catch (error) {

    console.error(error.message);

    if (error.err.code === 'invalid_data') {
      return response.status(UnprocessableEntity).json(error);
    }

    return response.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

module.exports = router;