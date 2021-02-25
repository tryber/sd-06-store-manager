const services = require('../Services/saleServices');

const create = async (sale) => {
  const createdSale = await services.create(sale);

  return createdSale;
};

const getAll = async () => {
  const salesList = await services.getAll();

  return salesList;
};

const findById = async (id) => {
  const sale = await services.findById(id);

  return sale;
};

module.exports = {
  create,
  getAll,
  findById
};
