const {Router} = require('express');

const ProductService = require('../services/ProductServices');
const {ok, created, badRequest} = require('../utils/status');
const router = Router();

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await ProductService.getOne(id);
  res.status(ok).json(product);
});

router.get('/', async (req, res) => {
  const products = await ProductService.getAll();
  res.status(ok).json(products);
});

router.post('/', async (req, res) => {
  const {name, quantity} = req.body;
  const {insertedId, err} = await ProductService.createOne({name, quantity});
  if (insertedId) {
    return res.status(created).json({
      _id: insertedId,
      name, quantity
    });
  }
  console.log({err}, 'controller');

  return res.status(err.status).json({err});
});

module.exports = router;


