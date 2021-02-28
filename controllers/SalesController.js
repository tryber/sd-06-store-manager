const { Router } = require('express');
const SalesService = require('../services/SalesService');
const {
  validateSaleQuantities,
  validateSaleId,
} = require('../middlewares');

const router = Router();
const SUCCESS = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;


router.get('/', async (request, response) => {
  const sales = await SalesService.getAll();
  response.status(SUCCESS).json(sales);
});

router.get('/:id', validateSaleId, async (request, response) => {
  const { id } = request.params;
  const requestedSale = await SalesService.findById(id);

  if (requestedSale.err) {
    return response.status(NOT_FOUND).json(requestedSale);
  };

  response.status(SUCCESS).json(requestedSale);
});

router.post('/', validateSaleQuantities, async (request, response) => {
  const sale = request.body;
  const registeredSale = await SalesService.create(sale);
  response.status(SUCCESS).json(registeredSale);
});

router.put('/:id',
  validateSaleId,
  validateSaleQuantities,
  async (request, response) => {
    const { id } = request.params;
    const updateInfo = request.body;
    const updatedSale = await SalesService.update(id, updateInfo);

    if (updatedSale.error) {
      return response.status(UNPROCESSABLE_ENTITY).json(updatedSale.error);
    };

    response.status(SUCCESS).json(updatedSale);
  });

router.delete('/:id', validateSaleId, async (request, response) => {
  const { id } = request.params;
  const removedSale = await SalesService.remove(id);

  if (removedSale.error) {
    return response.status(removedSale.error.code).json(removedSale.error);
  };

  response.status(SUCCESS).json(removedSale);
});

module.exports = router;
