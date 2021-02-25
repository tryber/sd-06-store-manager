const services = require('../Services/productServices');

const create = async (name, quantity) => {
  const createdModel = await services.create(name, quantity);

  return createdModel;
};

const getAll = async () => {
  return await services.getAll();
};

const findById = async (id) => {
  return await services.findById(id);
};

const updateById = async (id, name, quantity) => {
  return await services.updateById(id, name, quantity);
};

const deleteById = async (id) => {
  return await services.deleteById(id);
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById
};
