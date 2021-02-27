const model = require('../Models/storeManagerBD');
const minCaractName = 5;
const zero = 0;

const nameValid = (name, _quantity) => {
  if(typeof name !== 'string' || name.length < minCaractName) return false;
  return true;
};

const productRepeat = async (name) => {
  const getAllProducts = await model.getAllProducts();
  const notFound = getAllProducts.filter((product) => product.name === name);
  if(notFound.length > zero) return false;
  return true;
};

const productCreate = async (name, quantity) => {
  const produto = await model.createProduct(name, quantity);
  return produto;
};

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return products;
};

const findByIdProducts = async (id) => {
  const product = await model.findByIdProducts(id);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await model.updateProduct(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => {
  const productDeleted = await model.deleteProduct(id);
};

const createSales = async (soldItens) => {
  const salesCreated = await model.createSales(soldItens);
  return salesCreated;
};

const getAllSales = async () => {
  const sales = await model.getAllSales();
  return sales;
};

const findSalesById = async (id) => {
  const sale = await model.findSalesById(id);
  return sale;
};

module.exports = {
  nameValid,
  productRepeat,
  productCreate,
  getAllProducts,
  findByIdProducts,
  updateProduct,
  deleteProduct,
  createSales,
  getAllSales,
  findSalesById
};
