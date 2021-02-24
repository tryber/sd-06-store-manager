const SalesModel = require('../models/SalesModel');

const insertProducts = async (products) => {
  const insertedId = await SalesModel.insertProducts(products);
  return {
    _id: insertedId,
    itensSold: products
  };
};

module.exports = {
  insertProducts,
};
