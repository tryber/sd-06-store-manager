const { Router } = require('express');
const { createSale, getAllSales, getSaleById } = require('../modules/salesModules');
const { validateSale, validateProductId, validateSaleId } = require('../services/salesServices');

const SalesRouter = new Router();

const twoHundred = 200;
const fourHundredFour = 404;

SalesRouter.get('/sales', async (_req, res) => {
  const allSales = await getAllSales();
  return res.status(twoHundred).send({ sales: allSales});
});

SalesRouter.get('/sales/:id', validateSaleId, async (req, res) => {
  const { id } = req.params;
  const saleById = await getSaleById(id);
  if (!saleById) return res.status(fourHundredFour).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
  return res.status(twoHundred).send(saleById);
})

SalesRouter.post('/sales', validateSale, validateProductId, async (req, res) => {
  const sale = await createSale(req.body);
  return res.status(twoHundred).json(sale);
});

module.exports = { SalesRouter };
