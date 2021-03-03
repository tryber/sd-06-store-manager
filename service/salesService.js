const { getProductById } = require('../models/productsModel');
const { createSale, getSaleById, getSales } = require('../models/salesModel');

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

const getSaleValidation = async () => {
  const allSales = await getSales();
  return allSales;
};

const getSaleByIdValidation = async (id) => {
  const saleById = await getSaleById(id);
  console.log(saleById);

  if (!saleById) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
    };
  }

  return saleById;
};

module.exports = {
  createSaleValidation,
  getSaleValidation,
  getSaleByIdValidation,
};
