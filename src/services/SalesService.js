const Sales = require('../models/Sales');

const getAll = async () => {
  const sales = await Sales.getAll();
  
  return sales;
};

const create = async (products) => { 
  const sales = await Sales.create(products);
  
  return sales;
};

module.exports = {
  getAll,
  create,
};

