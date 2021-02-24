const { Router } = require('express');
const salesService = require('../services/sales_service');

const router = Router();

const OK = 200;
const UnprocessableEntity = 422;
const NotFound = 404;

router.get('/', async (_req, res) => {
  const items = await salesService.getAllSales();

  res.status(OK).json(items);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await salesService.findByIdSales(id);

    res.status(OK).json(item);
  } catch (e) {
    if (e.err.code === 'not_found') {
      res.status(NotFound).json(e);
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const newSale = await salesService.createSale(req.body);

    res.status(OK).json(newSale);
  } catch (e) {
    if (e.err.code === 'invalid_data') {
      res.status(UnprocessableEntity).json(e);
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await salesService.updateSale(id, req.body);
    const get = await salesService.findByIdSales(id);

    res.status(OK).json(get);
  } catch (e) {
    if (e.err.code === 'invalid_data') {
      res.status(UnprocessableEntity).json(e);
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await salesService.findByIdSales(id);
    await salesService.deleteSale(id);

    res.status(OK).json(deleted);
  } catch (e) {
    if (e.err.code === 'invalid_data') {
      res.status(UnprocessableEntity).json(e);
    }
  }
});

module.exports = router;
