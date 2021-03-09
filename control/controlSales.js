const { Router } = require('express');
const Sales = require('../models/Sales');
const validation = require('../middlewares/validationsSales');
const controlSales = new Router();
const sucesso = 200;

controlSales.post('/', validation.quantitySalesValidation, 
  async (req, res) => {
    const sales = req.body;
    const { insertedId } = await Sales.addSales(sales);
    const addedSale = {
      _id: insertedId,
      itensSold: sales,
    };
    return res.status(sucesso).json(addedSale);
  });
  
controlSales.get('/:id', validation.saleExists, 
  async (req, res) => {
    const { id } = req.params;
    res.status(sucesso).json(await Sales.findSalesById(id));
  });

controlSales.get('/', async (_request, res) => {
  const sales = await Sales.getSales();
  res.status(sucesso).json({ sales });
});

module.exports = controlSales;
