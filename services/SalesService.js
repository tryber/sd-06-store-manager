const Sale = require('../models/Sale');

const getAll = async () => {
  return await Sale.getAll();
};

const findById = async (id) => {
  return await Sale.findById(id);
};

const create = async (itensSold) => {
  const sale = await Sale.create(itensSold);
  return sale;
};

const update = async (id, quantity) => {
  return await Sale.update(id, quantity);
};

const remove = async (id) => {
  return await Sale.remove(id);
};



module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
};