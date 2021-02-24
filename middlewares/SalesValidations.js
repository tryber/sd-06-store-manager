const connection = require('../models/connection');
const Sales = require('../models/Sales');

const error = 422;
const errorNotFound = 404;
const ZERO = 0;
const UM = 1;
const TWEENTYFOUR = 24;

const messageError = (code, message) => {
  return {
    err: {
      code,
      message,
    }
  };
};

const validateQuantity = (request, response, next) => {
  const sales = request.body;

  const wrongQuantities = sales
    .filter((sale) => (sale.quantity <= ZERO) || (typeof sale.quantity !== 'number'));

  if (wrongQuantities.length >= UM) return response
    .status(error)
    .json(messageError('invalid_data', 'Wrong product ID or invalid quantity'));

  next();
};

const saleExists = async (request, response, next) => {
  const { id } = request.params;

  if (id.length !== TWEENTYFOUR) return response
    .status(errorNotFound).json(messageError('not_found', 'Sale not found'));

  next();
};

module.exports = {
  validateQuantity,
  saleExists,
};
