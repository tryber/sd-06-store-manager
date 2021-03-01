const { create, findName, getProducts } = require('../models/products');

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

module.exports = { 
  nameFind,
  createNewProduct,
  Products
};