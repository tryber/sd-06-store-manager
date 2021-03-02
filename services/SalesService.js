const { Sales } = require('../models');
const MIN_SALE = 1;
const STATUS_422 = 422;
const STATUS_404 = 404;
const err = { err:
  { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
const errID = { err:
  { code: 'not_found', message: 'Sale not found' } };


const middlewareVerification = async (response, sale) => {
  const resul = sale.map((product) => {
    if (product.quantity < MIN_SALE || !Number.isInteger(product.quantity)) {
      return response.status(STATUS_422).json(err);
    } else {
      return null;
    }
  });
  return resul;
};

const middlewareVerificationGetId = async (reponse, id, allSales) => {
  const result = allSales.find((sale) => sale._id == id);
  if (!result) return reponse.status(STATUS_404).json(errID);
  return null;
};

const salesAdded = async (products) => {
  return await Sales.addSales(products);
};

const getSales = async () => {
  return await Sales.getAllSales();
};

const getSaleById = async (id) => {
  return await Sales.getSalesById(id);
};

const updateSaleId = async (id, quantity, prodId) => {
  return await Sales.updateSaleById(id, quantity, prodId);
};

module.exports = {
  salesAdded,
  getSales,
  getSaleById,
  updateSaleId,
  middlewareVerification,
  middlewareVerificationGetId,
};
