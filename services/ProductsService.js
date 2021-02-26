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

module.exports = {
  getAll,
  findById,
  create,
};
