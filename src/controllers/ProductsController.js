const ProductsServices = require('../services/ProductsServices');
const rescue = require('express-rescue');
const {status} = require('../errorHandler/utils/status');

const registerProduct = rescue(async (req, res) => {
  const { body } = req;
  const responsePayload = await ProductsServices.registerProduct(body);

  res.status(status.created).json(responsePayload);
});

module.exports = {
  registerProduct
};