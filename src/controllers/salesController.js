const { Router } = require('express');
const SalesService = require('../services/SalesService');

const salesRouter = Router();
const SUCCESS = 200;


salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await SalesService.getById(id);

  if (result.payload) {
    const { payload: { err }, error } = result;
    return res.status(error.status).json({ err });
  }

  return res.status(SUCCESS).json(result);
});

salesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;
  const [ items ] = requestBody;
  const productId = items.productId;
  const quantity = items.quantity;

  const result = await SalesService.updateSale(id, productId, quantity);

  if (result && result.payload) {
    const { payload: { err }, error } = result;

    return res.status(error.status).json({ err });
  }
  
  return res.status(SUCCESS).send(result);
});

salesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await SalesService.deleteSale(id);

  if (result && result.payload) {
    const { payload: { err }, error } = result;

    return res.status(error.status).json({ err });
  }

  return res.status(SUCCESS).send(result);
});

salesRouter.post('/', async (req, res) => {
  const salesArr = req.body;
  const result = await SalesService.insertSale(salesArr);

  if (result && result.payload) {
    const { payload: { err }, error } = result;
    return res.status(error.status).json({ err });
  }

  return res.status(SUCCESS).send(result);
});

salesRouter.get('/', async (_req, res) => {
  const result = await SalesService.getAll();

  return res.status(SUCCESS).json(result);
});

salesRouter.put('/', async (_req, res) => {

});

module.exports = salesRouter;