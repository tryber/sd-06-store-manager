const Sales = require('../services/SalesService');

const UNPROCESSABLE = 422;
const ZERO = 0;

module.exports = async (request, response, next) => {
  const arraySales = request.body;
  const {quantity} = arraySales[0];
       
  if (!quantity || (quantity <= ZERO)) {
    return response.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  if (typeof quantity !== 'number') {
    return response.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};