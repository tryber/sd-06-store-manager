const { Router } = require('express');
const Sale = require('../services/SaleService');

const router = Router();

const statusOk = 200;
const statusError = 422;

router.post('/', async(req, res) => {
  const answer = await Sale.create(req.body);
  
  if(answer.err) return res.status(statusError).json(answer);

  return res.status(statusOk).json({ _id: answer.insertedId, itensSold: req.body });
});

module.exports = router;
