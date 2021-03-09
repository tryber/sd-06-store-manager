const express = require('express');
const status201 = 201;
const status200 = 200;
const magicNumberzero = 0;
const { ObjectId } = require('mongodb');

// import middlewares
const {
  validateQuantityGreaterEqual0,
  validateQuantityNotString,
  validateIdSalesExists,
} = require('../services/middlewaresSales');
// --------------------------------------
// import querys
const {
  createSales,
  getAll,
  findSalesByMongoId,
  updateSale,
  findSalesByProductId,
  deleteSale
} = require('../models/querysSales');
// -------------------------------------------

const salesRouter = express.Router();

salesRouter.post('/', validateQuantityGreaterEqual0,
  validateQuantityNotString, async (req, res) => {
    const products = req.body;
    const { insertedId } = await createSales(products);
    return res.status(status200).json({_id: insertedId, itensSold: products });
  });

salesRouter.get('/', async (_req, res) => {
  const sales = await getAll();
  return res.status(status200).json({ sales });
});

salesRouter.get('/:id', validateIdSalesExists, async (req, res) => {
  const { id } = req.params;
  const venda = await findSalesByMongoId(id);
  return res.status(status200).json(venda[0]);
});

salesRouter.put('/:id', validateQuantityGreaterEqual0, validateQuantityNotString,
  async (req, res) => {
    const { id } = req.params;
    const itensSolds = req.body;

    await updateSale(id,itensSolds);
    

    const findNovo = await findSalesByMongoId(id);
    console.log(findNovo[0]);
    return res.status(status200).json(findNovo[0]);
  });
/////
salesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const findDelete = await findSalesByMongoId(id);
  await deleteSale(id);
  return res.status(status200).json(findDelete);
});

module.exports = salesRouter;