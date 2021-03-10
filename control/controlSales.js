const { Router } = require('express');
const Sales = require('../models/Sales');
const validation = require('../middlewares/validationsSales');
const stock = require('../Stock/stockCenter');
const controlSales = new Router();
const sucesso = 200;

controlSales.post('/', validation.quantitySalesValidation, validation.stockFlow,
  async (req, res) => {
    const itensSold = req.body;
    const { insertedId } = await Sales.addSales(itensSold);
    const addedSale = {
      _id: insertedId,
      itensSold,
    };

    await stock.updateQuantity(itensSold);

    return res.status(sucesso).json(addedSale);
  });

controlSales.get('/:id', validation.salesValidation,
  async (req, res) => {
    const { id } = req.params;
    const sale = await Sales.getById(id);

    res.status(sucesso).json(sale);
  });

controlSales.get('/', async (_request, res) => {
  const sales = await Sales.getSales();
  res.status(sucesso).json({ sales });
});

controlSales.put('/:id', validation.quantitySalesValidation,
  async (req, res) => {
    const { id } = req.params;
    const sale = req.body;

    await stock.saleUpdateStock(id, sale);
    await Sales.saleUpdated(id, sale);
    const result = await Sales.getById(id);

    res.status(sucesso).json(result);
  });

controlSales.delete('/:id', validation.idFormat, 
  async (req, res) => {
    const { id } = req.params;
    const result = await Sales.getById(id);
  
    await stock.deleteStock(result);  
    await Sales.salesDelete(id);

    res.status(sucesso).json(result);
  });

module.exports = controlSales;

