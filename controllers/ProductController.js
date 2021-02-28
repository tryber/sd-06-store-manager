const { Router } = require('express');
const Product = require('../services/ProductService');

const router = Router();

const statusCreate = 201;

const statusError = 422;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const answer = await Product.create(name, quantity);
  
  if(answer.err) return res.status(statusError).json(answer);

  return res.status(statusCreate).json({ _id: answer.insertedId, name, quantity });
});

module.exports = router;