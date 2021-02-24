const Sale = require('../models/Sale');

const getAll = async () => {
  return await Sale.getAll();
};

const findById = async (id) => {
  return await Sale.findById(id);
};

const create = async (itensSold) => {
  // console.log('passa pelo service antes de ir para o Sale');
  const sale = await Sale.create(itensSold);
  return sale;
};

const update = async (id, body) => {
  return await Sale.update(id, body);
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