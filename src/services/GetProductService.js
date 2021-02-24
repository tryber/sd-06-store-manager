const Product = require('../models/Product');

const getAllProducts = async () => {
  const productResponse = await Product.getAllProduct();

  const resp = [ 200, { products: productResponse } ]

  return resp;
}

module.exports = getAllProducts;
