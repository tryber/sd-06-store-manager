const Products = require('../models/Products');

const getAll = async () => {
  return await Products.getAll();
};

const getById = async (id) => {
  return await Products.getById(id);
};

const create = async (name, quantity) => {
  return await Products.create(name, quantity);
};

const update = async (id, name, quantity) => {
  return await Products.update(id, name, quantity);
};

const remove = async (id) => {
  return await Products.remove(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};