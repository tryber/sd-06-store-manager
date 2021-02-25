const models = require('../Models/saleModels');

const create = async (sale) => {
  const createdSale = await models.create(sale);

  return createdSale;
};

const getAll = async () => {
  const salesList = await models.getAll();

  return salesList;
};

const findById = async (id) => {
  const sale = await models.findById(id);

  return sale;
};

const updateById = async (id, sale) => {
  const updatedSale = await models.updateById(id, sale);

  return updatedSale;
};

module.exports = {
  create,
  getAll,
  findById,
  updateById
};
