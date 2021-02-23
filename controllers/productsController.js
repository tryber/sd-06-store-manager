const { Router } = require('express');

const router = Router();

const productsService = require('../services/productsService');

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const statusOk = 201;

  const result = await productsService.create(name, quantity);

  if (result.err) return res.status(result.err.codeStatus)
    .json({ err: {
      code: result.err.code,
      message: result.err.message
    } });

  return res.status(statusOk).json({ result });
});

module.exports = router;
