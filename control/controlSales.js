const { Router } = require('express');
const Sales = require('../models/Sales');
const validation = require('../middlewares/validationsSales');
const stock = require('../Stock/stockCenter');
const controlSales = new Router();
const sucesso = 200;

controlSales.post('/', validation.quantitySalesValidation, validation.stockFlow,
  async (req, res) => {
    const Sold = req.body;
    const { insertedId } = await Sales.addSales(Sold);
    const addedSale = {
      _id: insertedId,
      Sold,
    };

    await stock.updateQuantity(Sold);

    return res.status(sucesso).json(addedSale);
  });

controlSales.get('/:id', validation.salesValidation,
  async (req, res) => {
    const { id } = req.params;
    const sale = await Sales.findSalesById(id);

    res.status(sucesso).json(sale);
  });

controlSales.get('/', async (_req, res) => {
  const sales = await Sales.getSales();
  res.status(sucesso).json({ sales });
});

controlSales.put('/:id', validation.quantitySalesValidation,
  async (req, res) => {
    const { id } = req.params;
    const sale = req.body;

    await stock.saleUpdateStock(id, sale);
    await Sales.saleUpdated(id, sale);
    const result = await Sales.findSalesById(id);

    res.status(sucesso).json(result);
  });

controlSales.delete('/:id', validation.idValidation, 
  async (req, res) => {
    const { id } = req.params;
    const result = await Sales.findSalesById(id);
  
    await stock.deleteStock(result);  
    await Sales.salesDelete(id);

    res.status(sucesso).json(result);
  });

module.exports = controlSales;
