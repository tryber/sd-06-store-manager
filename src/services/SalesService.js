const Sales = require('../models/Sales');

const getAll = async () => {
  const sales = await Sales.getAll();
  
  return sales;
};

const findById = async (id) => {
  const sale = await Sales.findById(id);
  
  return sale;
};

const findProductId = async (id) => {
  const sale = await Sales.findProductId(id);
  
  return sale;
};

const update = async (productId, quantity, id) => {
  const sale = await Sales.update(productId, quantity, id);
  
  return sale;
};

const create = async (products) => { 
  const sales = await Sales.create(products);
  
  return sales;
};

const remove = async (id) => {
  const myProduct = await findById(id);
  
  if (!myProduct) return false;
  
  const sales = await Sales.remove(id);
  
  return sales;
};

module.exports = {
  getAll,
  create,
  findById,
  findProductId,
  update,
  remove,
};

