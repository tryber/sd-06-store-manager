const Product = require('../models/Product');

const SUCESS = 200;

const getAllProducts = async () => {
  const productResponse = await Product.getAllProduct();

  const resp = [ SUCESS, { products: productResponse } ];

  return resp;
};

module.exports = getAllProducts;
