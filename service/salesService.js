const { getProductById } = require('../models/productsModel');
const { createSale } = require('../models/salesModel');

const createSaleValidation = async (query) => {
  const getByID = query.map(async (e) => getProductById(e.productId));
  const validateId = getByID.some((e) => !e);

  const result = await createSale(query);

  if (validateId) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  return result;
};

module.exports = {
  createSaleValidation,
};
