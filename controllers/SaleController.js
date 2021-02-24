const { Router } = require('express');
const rescue = require('express-rescue');
const { SaleServices } = require('../services');
const { SaleValidator } = require('../middlewares');

const SaleController = new Router();
const status200 = 200;
const status404 = 404;
const status422 = 422;

SaleController.get('/', rescue( async (_req, res) => {
  const all = await SaleServices.getAll();
  res.status(status200).json(all);
}));

SaleController.get('/:id', rescue( async (req, res) => {
  try {
    const sale = await SaleServices.getById(req.params.id);
    res.status(status200).json(sale);
  } catch (err) {
    res.status(status404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }})
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

SaleController.delete('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const oldSale = await SaleServices.getById(id);
    await SaleServices.deleteSale(id);
    res.status(status200).json(oldSale);
  } catch (err) {
    res.status(status422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' }
    });
  }
}));

module.exports = SaleController;