const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/serviceSale');

const success = 200;
const created = 201;
const successNoContent = 204;
const unprocessable = 422;

const router = Router();

router.get('/', rescue(async (req, res) => {
  const sale = await service.getAllSales();

  res.status(success).json({itensSold: [{
    productId, quantity:sale
  }]});
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await service.getByIdSale(id);

  res.status(success).json({itensSold: [{
    productId, quantity: sale
  }]});
}));

router.post('/', rescue(async (req, res) => {
  const { quantity } = req.body;

  const createdSale = await service.createSale({quantity});

  res.status(created).json({itensSold: [{
    productId, quantity: createdSale
  }]});
}));

router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const update = await service.updateSale({ id, productId, quantity });

  res.status(success).json({itensSold: [{
    productId, quantity: update
  }]});
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  
  await service.excludeSale(id);
  res.status(successNoContent).end();
}));

module.exports = router;