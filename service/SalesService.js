const SalesModel = require('../model/SalesModel');

const createSale = async (sale) => {
  return SalesModel.createSale(sale);
};

const findSaleByItensSold = async (itens) => {
  return SalesModel.findSaleByItensSold(itens);
};

const findAllSales = async () => {
  return SalesModel.findAllSales();
};

const findSaleById = async (id) => {
  return SalesModel.findSaleById(id);
};

const updateSale = async (id, itens) => {
  return SalesModel.updateSale(id, itens);
};

const deleteSale = async (id) => {
  return SalesModel.deleteSale(id);
};

const checkQuantityLessThanZero = (quantity) => {
  const zero = 0;

  if(quantity < zero) {
    return true;
  }
  return false;
};

const checkQuantityEqualZero = (quantity) => {
  const zero = 0;

  if(quantity === zero) {
    return true;
  }
  return false;
};

const checkQuantityString = (quantity) => {
  if(typeof quantity === 'string') {
    return true;
  }
  return false;
};

module.exports = {
  createSale,
  findSaleByItensSold,
  findAllSales,
  updateSale,
  deleteSale,
  findSaleById,
  checkQuantityLessThanZero,
  checkQuantityEqualZero,
  checkQuantityString
};
