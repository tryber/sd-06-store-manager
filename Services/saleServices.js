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

module.exports = {
  create,
  getAll,
  findById
};
