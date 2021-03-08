const express = require('express');
const status201 = 201;

const salesRouter = express.Router();

salesRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  return res.status(status201).json({ name, quantity });
});

module.exports = salesRouter;