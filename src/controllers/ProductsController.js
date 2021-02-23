const ProductsServices = require('../services/ProductsServices');
const rescue = require('express-rescue');
const {status} = require('../errorHandler/utils/status');

const registerProduct = rescue(async (req, res) => {
  const { body } = req;
  const responsePayload = await ProductsServices.registerProduct(body);

  res.status(status.created).json(responsePayload);
});

const getAll = async (req, res) => {
  const responsePayload = await ProductsServices.getAll();
  res.status(status.ok).json(responsePayload);
};

const getById = rescue(async (req, res) => {
  const {id} = req.params;

  const responsePayload = await ProductsServices.findById(id);

  res.status(status.ok).json(responsePayload);
});

const updateProducts = rescue(async (req, res) => {
  const { body } = req;
  const { id } = req.params;


  res.status(status.ok).send('updateProducts');
});

module.exports = {
  registerProduct,
  getAll,
  getById,
  updateProducts
};