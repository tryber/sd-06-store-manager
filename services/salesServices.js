const Sales = require('../models/salesModel');


const validation = async (sales, id) => {
  sales.map(sale => {
    if (sale.quantity < 1 || typeof sale.quantity === 'string' ) {
      throw new Error;
    }
  });
};

const getAll = async () => {
  return await Sales.getAll();
};

const getById = async (id) => {
  const sale = await Sales.getById(id);
  if (!sale) throw new Error;
  return product;
};

const create = async (sales) => {
  await validation(sales);
  return Sales.create(sales);
};

const update = async (id, sales) => {
  await validation(sales);
  return await Sales.update(id, sales);
};

const remove = async (id) => {
  const sale = await Sales.getById(id);
  console.log(sale);
  if (!sale) throw new Error;
  await Sales.remove(id);
  return sale;
};



module.exports = {
  getAll,
  create,
  getById,
  update,
  remove
};
