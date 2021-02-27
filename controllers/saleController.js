const { Router } = require('express');
const saleService = require('../service/saleService');

const routerSale = new Router();
const SUCCESS = 200;

routerSale.get('/', async (_req, res)=>{
  const sales = await saleService.getAll();
  res.status(SUCCESS).json(sales);
});

routerSale.post('/', async (req, res) =>{
  const sale = req.body;
  const insertedSaleId = await saleService.createSale(sale);
  if(insertedSaleId.isError){
    return res.status(insertedSaleId.status).json({
      err: {
        code: 'invalid_data',
        message: insertedSaleId.message,
      },
    });
  }
  return res.status(SUCCESS).json(insertedSaleId);
});

module.exports = routerSale;
