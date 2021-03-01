const { get } = require('frisby');
const { getAllProducts } = require('../models/productsModel');

const SUCCESS = 200;

const validateGetAllProducts = async function (req, res, next) {
  res.status(SUCCESS).json(await getAllProducts());
  next();
};

module.exports = {
  validateGetAllProducts,
};
