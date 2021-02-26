const Sales = require('../models/Sales');

const register = async (items) => {
  const { _id, itensSold } = await Sales.register(items);

  return {
    _id,
    itensSold,
  };
};

module.exports = {
  register,
};
