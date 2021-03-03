const {
  create,
  getSales,
  changeSales,
  deleteSale
} = require('../models/sales');

const createNewSale = async (sales) => {
  const createSale = await create(sales);
  return createSale;
};

const Sales = async (id) => {
  const sales = await getSales(id);
  return sales;
};

const saleChange = async (id, sale) => {
  const sales = await changeSales(id, sale);
  return sales;
};

const saleDelete = async (id) => {
  const sales = await deleteSale(id);
  return sales;
};


module.exports = { 
  createNewSale,
  Sales,
  saleChange,
  saleDelete
};