const Sales = require('../models/Sales');

const getAll = async () => {
  return await Sales.getAll();
};

const findById = async (id) => {
  return await Sales.findById(id);
};

const register = async (items) => {
  const { _id, itensSold } = await Sales.register(items);

  return {
    _id,
    itensSold,
  };
};

const update = async (id, sale) => {
  const updated = Sales.update(id, sale);

  return updated;
};

module.exports = {
  getAll,
  findById,
  register,
  update,
};
