const Products = require('../models/Products');

const getAll = async () => {
  return await Products.getAll();
};

const findById = async (id) => {
  return await Products.findById(id);
};

const create = async (name, quantity) => {
  const nameExists = await Products.findByName(name);
  if (nameExists) return false;

  const { insertedId } = await Products.create(name, quantity);

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const update = async (id, name, quantity) => {
  const updated = await Products.update(id, name, quantity);

  return updated;
};

const remove = async (id) => {
  const removed = await Products.remove(id);

  return removed;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
