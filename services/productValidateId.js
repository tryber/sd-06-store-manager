const model = require('../models/productModel');

const { ERROR_MESSAGE: { invalidId } } = require('../utils/dictionary');

module.exports = async (id) => {
  const productById = await model.getById(id);
  if (!productById) throw(invalidId);
};
