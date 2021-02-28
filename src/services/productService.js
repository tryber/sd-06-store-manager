const productModel = require('../models/productModel');
const { throwError } = require('../utils/errorHandler');
const { status, errors } = require('../utils/status');

const createProduct = async ({ name, quantity }) => {
  const product = await productModel.getByName(name);

  if (product) {
    throw new throwError(status.unprocessableEntity, errors.productExists);
  }

  const createdProduct = await productModel.createProduct(name, quantity);

  const result = {
    _id: createdProduct.insertedId,
    name,
    quantity,
  };

  return result;
};

module.exports = { createProduct };
