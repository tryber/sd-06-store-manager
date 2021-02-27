const { Router } = require('express');

const router = Router();

const salesService = require('../services/salesService');
const status200 = 200;
const status201 = 201;
const status422 = 422;

router.post('/', async (req, res) => {
  const itensSold  = req.body;

  const result = await salesService.create(itensSold);

  return res.status(status200).json(result);
});

module.exports = router;
