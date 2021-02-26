const Store = require('../models/store');
const { ObjectId } = require('mongodb');

//Product
const createProduct = async (product) => {
  return await Store.createProduct(product);
};

const ProductList = async () => {
  return await Store.ProductList();
};

const findById = async (id) => {
  return await Store.findById(id);
};
const update = async (id, name, quantity) => {
  return await Store.update(id, name, quantity);

};
const remove = async (id) => {
  return await Store.remove(id);
};

//Sales
const salesList = async () => {
  return await Store.salesList();
};
const createSales = async (products) => {
  const create = await Store.createSales(products);
  const [{ productId, quantity }] = create.ops[0].itensSold;
  const foundProduct = await findById(productId);
  const productStock = (foundProduct.quantity - quantity);
  await update(productId, foundProduct.name, productStock);

  return create;
};
const findSalesById = async (Sales) => {
  return await Store.findSalesById(Sales);
};
const saleUpdate = async (id, products) => {
  return await Store.saleUpdate(id, products);
};
const salesRemove = async (id) => {
  const oldSales = await findSalesById(id);
  const [{ productId, quantity }] = oldSales.itensSold;
  const foundProduct = await findById(productId);
  const productStock = (foundProduct.quantity + quantity);
  await update(productId, foundProduct.name, productStock);
  const remove = await Store.salesRemove(id);
  return remove;
};

module.exports = {
  createProduct,
  ProductList,
  findById,
  update,
  remove,
  salesList,
  createSales,
  findSalesById,
  saleUpdate,
  salesRemove
};
