const {notFound} = require('../utils/status');
const {Router} = require('express');

const SalesServices = require('../services/SalesServices');
const { created, ok, unProcessableEntity } = require('../utils/status');

const route =  Router();

route.get('/:id', async (req, res) => {
  const {id} = req.params;
  const {itensSold, err} = await SalesServices.getOne(id);
  console.log(err, itensSold);
  if (err) return res.status(err.status).json({err});
  return res.status(ok).json({itensSold:  itensSold});
});

route.get('/', async (req, res) => {
  const sales = await SalesServices.getAll();
  console.log(sales);
  return res.status(ok).json({sales});
});

route.post('/', async (req, res) => {
  const [...itensSold] = req.body;

  const {err, insertedId} = await SalesServices.createOne(itensSold);
  // console.log(oductId, quantity, 'controller');
  if (err) {
    return res.status(err.status).json({err});
  }
  return res.status(ok).json({itensSold, _id: insertedId});
});

route.put('/:id', async (req, res) => {
  const {id} = req.params;
  const [...itensSold] = req.body;
  const response = await SalesServices.updateOne(id, itensSold);
  const {err} = response;
  if(err) return res.status(err.status).json({err});
  return res.status(ok).json({_id: response.upsertedId._id, itensSold});
});

route.delete('/:id', async (req, res) => {
  
});

module.exports = route;
