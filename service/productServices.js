const { getAllProducts } = require('../models/storeModel');

const lastProductDatabase = async () => {
  const allProducts = await getAllProducts();
  const indexLastProductAdd = allProducts.length -1;
  return allProducts[indexLastProductAdd];
};

module.exports = lastProductDatabase;
