const saleModel = require('../models/saleModel');
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

const updateSale = async (id, sale) => {
  const updatedSale = await saleModel.updateSale(id, sale);

  if (updatedSale === 1) {
    const updateSales = {
      _id: id,
      itensSold: sale,
    };

    return updateSales;
  }
};

const deleteSale = async (id) => {
  const deletedSale = await saleModel.deletedSale(id);

  if (!deletedSale) {
    throw new throwError(status.notFound, errors.wrongSaleID);
  }

  await saleModel.deleteSale(id);

  return id;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
