const { SalesModel } = require('../models');

const getAll = async () => await SalesModel.getAll();
const getById = async (id) => await SalesModel.getById(id);
const postSale = async (sale) => await SalesModel.postSale(sale);
const putSale = async (id, sale) => await SalesModel.putSale(id, sale);
const deleteSale = async (id) => await SalesModel.deleteSale(id);

module.exports = {
  getAll,
  getById,
  postSale,
  putSale,
  deleteSale,
};