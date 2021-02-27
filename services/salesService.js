const sales = require('../models/sales');

const dataValidate = async (itensSold) => {
  const number0 = 0;

  let error = {};

  itensSold.forEach(item => {
    if (item.quantity <= number0) {
      error = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
          codeStatus: 422,
        }
      };
    }
  });

  return error;
};

const create = async (itensSold) => {
  const errorMessage = await dataValidate(itensSold);
  console.log(errorMessage);

  if (errorMessage.err) return errorMessage;

  const salesResult = await sales.create(itensSold);

  return salesResult;
};

module.exports = {
  create,
};
