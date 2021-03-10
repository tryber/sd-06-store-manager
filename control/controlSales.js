const { Router } = require('express');
const Sales = require('../models/Sales');
const validation = require('../middlewares/validationsSales');
const controlSales = new Router();
const sucesso = 200;

controlSales.post('/', validation.quantitySalesValidation, 
  async (req, res) => {
    const Sold = req.body;
    const { insertedId } = await Sales.addSales(Sold);
    const addedSale = {
      _id: insertedId,
      itensSold,
    };
    return res.status(sucesso).json(addedSale);
  });
  
controlSales.get('/:id', validation.salesValidation, 
  async (req, res) => {
    const { id } = req.params;
    const sale = await Sales.findSalesById(id);

    response.status(sucesso).json(sale);
  });

controlSales.get('/', async (_req, res) => {
  const sales = await Sales.getSales();
  res.status(sucesso).json({ sales });
});

controlSales.put('/:id', validation.quantitySalesValidation, 
  async (req, res) => {
    const { id } = req.params;
    const sale = req.body;

    await Sales.salesUpdated(id, sale);
    const result = await Sales.findSalesById(id);

    res.status(sucesso).json(result);
  });

controlSales.put('/:id', validation.idSalesValidation, 
  async (req, res) => {
    const { id } = req.params;
    const result = await Sales.findSalesById(id);

    await Sales.salesDelete(id);

    res.status(sucesso).json(result);
  });

module.exports = controlSales;
