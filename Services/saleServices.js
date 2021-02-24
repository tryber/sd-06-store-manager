const models = require('../Models/saleModels');

const create = async (sale) => {
  return await models.create(sale);
};

module.exports = {
  create
};
