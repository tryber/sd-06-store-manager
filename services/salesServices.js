// const salesController = require('../controller/salesController');
const salesModel = require('../model/salesModel'); //importa as funçoes

const getAllSales = () => salesModel.getAll();

const getListSalesId = async (id) => {
  const returnListSalesId = await salesModel.getId(id);
  return returnListSalesId;
};

const putEditListIdSales = async (id, itensSold) => {
  const returnEditListIdSales = await salesModel.putId(id, itensSold);
  return returnEditListIdSales;
};

// cadastrarvendas
const registerSales = async (itensSold) => {
  const newSales = await salesModel.create(itensSold);
  return newSales;
};

const deleteOneSales = async (id) => {
  const deletedSales = await salesModel.deleteSales(id);
  return deletedSales;
};

module.exports = {
  registerSales,
  deleteOneSales,
  putEditListIdSales,
  getListSalesId,
  getAllSales,
};
