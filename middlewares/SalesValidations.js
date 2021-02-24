const Sales = require('../models/Sales');

const error = 422;
const ZERO = 0;
const UM = 1;

const messageError = (string) => {
  return {
    err: {
      code: 'invalid_data',
      message: string,
    }
  };
};

const validateQuantity = (request, response, next) => {
  const sales = request.body;

  const wrongQuantities = sales
    .filter((sale) => (sale.quantity <= ZERO) || (typeof sale.quantity !== 'number'));

  if (wrongQuantities.length >= UM) return response
    .status(error).json(messageError('Wrong product ID or invalid quantity'));

  next();
};

module.exports = {
  validateQuantity,
};
