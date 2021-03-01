const { Router } = require('express');
const Sale = require('../services/SaleService');

const router = Router();

const statusOk = 200;
const statusError = 422;
const statusNotFound = 404;

router.post('/', async(req, res) => {
  const answer = await Sale.create(req.body);
  
  if(answer.err) return res.status(statusError).json(answer);

  return res.status(statusOk).json({ _id: answer.insertedId, itensSold: req.body });
});

router.get('/', async(req, res) => {
  return res.status(statusOk).send({ sales: await Sale.getById() });
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  const answer = await Sale.getById(id);

  if(answer.err) return res.status(statusNotFound).json(answer);

  return res.status(statusOk).send(answer);
});

router.put('/:id', async(req, res) => {
  const { id } = req.params;

  const answer = await Sale.change(id, req.body);
  
  if(answer.err) return res.status(statusError).json(answer);

  return res.status(statusOk).json({ _id: id, itensSold: req.body });
});

module.exports = router;
