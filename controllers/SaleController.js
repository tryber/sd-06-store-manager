const { Router } = require('express');
const rescue = require('express-rescue');
const { SaleServices } = require('../services');
const { SaleValidator } = require('../middlewares');

const SaleController = new Router();
const status200 = 200;

SaleController.get('/', rescue( async (_req, res) => {
  const all = await SaleServices.getAll();
  res.status(status200).json(all);
}));

SaleController.get('/:id',
  SaleValidator.saleIdExists,
  rescue( async (req, res) => {
    const { id } = req.params;
    const sale = await SaleServices.getById(id);
    res.status(status200).json(sale);
  })
);

SaleController.post('/',
  SaleValidator.saleValidator,
  rescue( async (req, res) => {
    const { body } = req;
    const newSale = await SaleServices.postSale(body);
    res.status(status200).json(newSale);
  })
);

SaleController.put('/:id',
  SaleValidator.saleValidator,
  rescue( async (req, res) => {
    const { id } = req.params;
    const updatedSale = await SaleServices.putSale(id, req.body);
    res.status(status200).json(updatedSale);
  })
);

SaleController.delete('/:id',
  SaleValidator.saleDeleteById,
  rescue(async (req, res) => {
    const { id } = req.params;
    const oldSale = await SaleServices.getById(id);
    await SaleServices.deleteSale(id);
    res.status(status200).json(oldSale);
  }));

module.exports = SaleController;