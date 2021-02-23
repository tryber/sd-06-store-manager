const models = require('../Models/productModels');

const create = async (name, quantity) => {
  const createdModel = await models.create(name, quantity);

  return createdModel;
};

const getAll = async () => {
  return await models.getAll();
};

const findById = async (id) => {
  return await models.findById(id);
};

module.exports = {
  create,
  getAll,
  findById
};
