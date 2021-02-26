const SalesService = require('../services/SalesService');
const SUCCESS = 200;

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await SalesService.getById(id);

  if (result.payload) return next(result);
  return res.status(SUCCESS).json(result);
};

const updateSale = async (req, res, next) => {
  const { id } = req.params;
  const requestBody = req.body;
  const [ product ] = requestBody;
  const { productId, quantity } = product;
  const result = await SalesService.updateSale(id, productId, quantity);

  if (result.payload) return next(result);
  return res.status(SUCCESS).send(result);
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  const result = await SalesService.deleteSale(id);

  if (result.payload) return next(result);
  return res.status(SUCCESS).send(result);
};

const insertSale = async (req, res, next) => {
  const salesArr = req.body;
  const result = await SalesService.insertSale(salesArr);

  if (result.payload) return next(result);
  return res.status(SUCCESS).send(result);
};

const getAllSales = async (_req, res) => {
  const result = await SalesService.getAll();

  return res.status(SUCCESS).json(result);
};

module.exports = {
  getById,
  updateSale,
  deleteSale,
  insertSale,
  getAllSales,
};
