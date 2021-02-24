const product = require('../Models/products');


const createProductService = async (name, quantity) => {
  return product.createProduct(name, quantity);
};

const productByNameService = async (name) => {
  return product.productByName(name);
};

module.exports = {
  createProductService,
  productByNameService,
};
