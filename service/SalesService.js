const SalesModel = require('../model/SalesModel');

const createSale = async (sale) => {
  return SalesModel.createSale(sale);
};

const findSaleByItensSold = async (itens) => {
  SalesModel.findSaleByItensSold(itens);
};

const findAllSales = async () => {
  SalesModel.findAllSales();
};

const findSaleById = async (id) => {
  SalesModel.findSaleById(id);
};

const updateSale = async (itens) => {
  SalesModel.updateSale(itens);
};

const deleteSale = async (id) => {
  SalesModel.deleteSale(id);
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
  checkQuantityLessThanZero,
  checkQuantityEqualZero,
  checkQuantityString
};
