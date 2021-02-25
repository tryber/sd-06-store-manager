const {Router} = require('express');

const ProductService = require('../services/ProductServices');
const {ok, created, badRequest,unProcessableEntity,
  notFound} = require('../utils/status');
const router = Router();

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const {product, err} = await ProductService.getOne(id);
  if (product) return res.status(ok).json(product);
  
  return res.status(err.status).json({err});
});

router.get('/', async (req, res) => {
  const products = await ProductService.getAll();
  res.status(ok).json({products});
});

router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const {name, quantity} = req.body;
  const response = await ProductService.update(id, name, quantity);
  const {err} = response;
  if (err) return res.status(err.status).json({err});

  return res.status(ok).json({name: response.upsertedId._id, quantity});
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

  return res.status(err.status).json({err});
});

module.exports = router;


