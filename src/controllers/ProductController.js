const createProductService = require('../services/CreateProductService');
const getProductService = require('../services/GetProductService');
const getProductByIdService = require('../services/GetProductByIdService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const resp = await createProductService(name, quantity);

  return res.status(resp[0]).json(resp[1]);
};

const getAllProduct = async (_req, res) => {
  const resp = await getProductService();

  return res.status(resp[0]).json(resp[1]);
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  const resp = await getProductByIdService(id);

  return res.status(resp[0]).json(resp[1]);
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById
};
