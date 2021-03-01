const { Router } = require('express');
const Product = require('../services/ProductService');

const router = Router();

const statusCreate = 201;
const statusOk = 200;
const statusError = 422;

router.post('/', async(req, res) => {
  const { name, quantity } = req.body;

  const answer = await Product.create(name, quantity);
  
  if(answer.err) return res.status(statusError).json(answer);

  return res.status(statusCreate).json({ _id: answer.insertedId, name, quantity });
});

router.get('/', async(req, res) => {
  return res.status(statusOk).send({ products: await Product.getById() });
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  const answer = await Product.getById(id);

  if(answer.err) return res.status(statusError).json(answer);

  return res.status(statusOk).send(answer);
});

router.put('/:id', async(req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const answer = await Product.change(id, name, quantity);
  
  if(answer.err) return res.status(statusError).json(answer);

  return res.status(statusOk).json({ _id: answer.insertedId, name, quantity });
});

module.exports = router;