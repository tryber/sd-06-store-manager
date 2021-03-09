const express = require('express');
const status200 = 200;

// import middlewares
const {
  validateQuantityGreaterEqual0,
  validateQuantityNotString,
  validateIdSalesExists,
  validateIdSalesExistsDel
} = require('../services/middlewaresSales');
// --------------------------------------
// import querys
const {
  createSales,
  getAll,
  findSalesByMongoId,
  updateSale,
  findSalesByProductId,
  deleteSale,
} = require('../models/querysSales');
const { findProductById, updateNameQuantity } = require('../models/querysProduct');
// -------------------------------------------

const salesRouter = express.Router();

salesRouter.post('/', validateQuantityGreaterEqual0,
  validateQuantityNotString, async (req, res) => {
    const products = req.body;
    const { insertedId } = await createSales(products);
    const [{ productId, quantity }] = req.body;
    /// atualizando valor do produto
    const findproduct = await findProductById(productId);
    if(findProductById !== []) {}
    const newName = findproduct[0].name;
    const newQuantity = findproduct[0].quantity - quantity;
    await updateNameQuantity(productId, newName, newQuantity);
    /////
    return res.status(status200).json({_id: insertedId, itensSold: products });
  });

salesRouter.get('/', async (_req, res) => {
  const sales = await getAll();
  return res.status(status200).json({ sales });
});

salesRouter.get('/:id', validateIdSalesExists, async (req, res) => {
  const { id } = req.params;
  const venda = await findSalesByMongoId(id);
  return res.status(status200).json(venda);
});

salesRouter.put('/:id', validateQuantityGreaterEqual0, validateQuantityNotString,
  async (req, res) => {
    const { id } = req.params;
    const itensSolds = req.body;
    await updateSale(id,itensSolds);
    const findNovo = await findSalesByMongoId(id);
    return res.status(status200).json(findNovo);
  });

salesRouter.delete('/:id', validateIdSalesExistsDel, async (req, res) => {
  const { id } = req.params;
  const findDelete = await findSalesByMongoId(id);
  await deleteSale(id);
  /// atualizando valor do produto
  const { itensSold } = findDelete;
  const newId = itensSold[0].productId;
  const deletedQuantity = itensSold[0].quantity;
  const findproduct = await findProductById(newId);
  const newName = findproduct[0].name;
  const newQuantity = findproduct[0].quantity + deletedQuantity;
  await updateNameQuantity(newId, newName, newQuantity);
  //////
  return res.status(status200).json(findDelete);
});

module.exports = salesRouter;