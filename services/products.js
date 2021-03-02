const {
  create,
  findName,
  getProducts,
  changeProduct,
  deleteProduct 
} = require('../models/products');

const nameFind = async (name) => {
  const prod = await findName(name);
  return prod;
};

const createNewProduct = async (product) => {
  await create(product);
  return product;
};

const Products = async (id) => {
  const products = await getProducts(id);
  return products;
};

const productChange = async (product) => {
  const prod = await changeProduct(product);
  return prod;
};

const productDelete = async (id) => {
  const prod = await deleteProduct(id);
  return prod;
};

module.exports = { 
  nameFind,
  createNewProduct,
  Products,
  productChange,
  productDelete
};