const product = require('../Models/products');


const createProductService = async (name, quantity) => {
  return product.createProduct(name, quantity);
};

const productByNameService = async (name) => {
  return product.productByName(name);
};

const listProductsService = async () => {
  return product.listProducts();
};

const productByIdService = async (id) => {
  return product.productById(id);
};

module.exports = {
  createProductService,
  productByNameService,
  listProductsService,
  productByIdService
};
