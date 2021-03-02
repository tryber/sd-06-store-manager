const { Sales } = require('../models');
const MIN_SALE = 1;
const STATUS_422 = 422;
const STATUS_404 = 404;
const ID_LENGTH = 24;
const err = { err:
  { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
const errID = { err: { code: 'not_found', message: 'Sale not found' } };
const errDelete = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };


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

const middlewareVerificationGetId = async (response, id, allSales) => {
  const result = allSales.find((sale) => sale._id == id);
  if (!result) return response.status(STATUS_404).json(errID);
  return null;
};

const middlewareVerificationDelete = async (response, id) => {
  if (id.length !== ID_LENGTH) return response.status(STATUS_422).json(errDelete);
  const saleToBeDeleted = await getSaleById(id);
  if (saleToBeDeleted === null) return response.status(STATUS_422).json(errDelete);
  return saleToBeDeleted;
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

const deleteSaleId = async (id) => {
  return await Sales.deleteSaleById(id);
};

module.exports = {
  salesAdded,
  getSales,
  getSaleById,
  updateSaleId,
  deleteSaleId,
  middlewareVerification,
  middlewareVerificationGetId,
  middlewareVerificationDelete,
};
