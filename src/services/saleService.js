const saleModel = require('../models/SaleModel');
const { throwError } = require('../utils/errorHandler');
const { status, errors } = require('../utils/status');
// const { get } = require('frisby');

const createSale = async (sale) => {
  const insertedId = await saleModel.createSale(sale);

  const createdSale = {
    _id: insertedId,
    itensSold: sale,
  };

  return createdSale;
};

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();

  const resultSales = { sales };

  return resultSales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
