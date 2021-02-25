const model = require('../models/salesModel');

const { ERROR_MESSAGE: {
  invalidQuantityOrId,
  invalidSaleId,
  saleNotFound
} } = require('../utils/dictionary');

const ZERO = 0;

const validateSale = async (sales) => {
  return sales.map(({ _, quantity }) => {
    if (quantity <= ZERO) throw invalidQuantityOrId;
    if (typeof quantity === 'string') throw invalidQuantityOrId;
  });
};

const validateSaleId = async (id, param) => {
  const salesById = await model.getById(id);

  if (!salesById && !param) throw(saleNotFound);
  if (!salesById && param) throw(invalidSaleId);

  return salesById;
};

module.exports = {
  validateSale,
  validateSaleId
};

