const { Router } = require('express');
const saleService = require('../service/saleService');

const routerSale = new Router();
const SUCCESS = 200;

routerSale.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getSaleById(id);

  if(sale.isError){
    return res.status(sale.status).json({
      err: {
        code: 'not_found',
        message: sale.message,
      },
    });
  }
  return res.status(SUCCESS).json(sale);
});

routerSale.get('/', async (_req, res)=>{
  const sales = await saleService.getAll();
  return res.status(SUCCESS).json({sales});
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

routerSale.put('/:id', async (req, res)=>{
  const {id} = req.params;
  const sale = req.body;
  const editedSale = await saleService.editSaleById(id, sale);
  if(editedSale.isError){
    return res.status(editedSale.status).json({
      err: {
        code: 'invalid_data',
        message: editedSale.message,
      },
    });
  }
  return res.status(SUCCESS).json(editedSale);
});

routerSale.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const deletedSale = await saleService.deleteSaleById(id);
  console.log('deletedSale', deletedSale);
  if(deletedSale.isError){
    return res.status(deletedSale.status).json({
      err: {
        code: 'invalid_data',
        message: deletedSale.message,
      },
    });
  }
  return res.status(SUCCESS).json({deletedSale});
});

module.exports = routerSale;
