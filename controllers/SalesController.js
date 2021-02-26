const {Router} = require('express');

const SalesServices = require('../services/SalesServices');
const { created, ok, unProcessableEntity } = require('../utils/status');

const route =  Router();

route.get('/:id', async (req, res) => {
  const {id} = req.params;
  const {itensSold, err} = await SalesServices.getOne(id);
  if (err) return res.status(err.status).json({err});
  return res.status(ok).json({itensSold});
});

route.get('/', async (req, res) => {
  const itensSold = await SalesServices.getAll();
  return res.status(ok).json({itensSold});
});

route.post('/', async (req, res) => {
  const [...itensSold] = req.body;

  const {err, sale} = await SalesServices.createOne(itensSold);
  // console.log(oductId, quantity, 'controller');
  if (err) {
    return res.status(err.status).json({err});
  }
  return res.status(ok).json({itensSold: sale});
});

route.put('/:id', async (req, res) => {
  const {id} = req.params;
  const {productId, quantity} = req.body;
  const {product, err} = await SalesServices.updateOne(id, productId, quantity);
  if(err) return res.status(err.status).json({err});
  return res.status(ok).json({product});
});

route.delete('/:id', async (req, res) => {
  
});

module.exports = route;
