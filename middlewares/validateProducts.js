const rescue = require('express-rescue');

const INVALID_QUANTITY = 0;
const INVALID_NAME_LENGTH = 5;
const UNPROCESABLE_ENTITY = 422;

const validation = rescue(async (request, response, next) => {
  const { name, quantity } = request.body;

  const invalidName = !name || name.length < INVALID_NAME_LENGTH;
  const invalidQuantity = quantity <= INVALID_QUANTITY;

  if (invalidName) {
    return response.status(UNPROCESABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  if (invalidQuantity) {
    return response.status(UNPROCESABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (!Number.isInteger(parseInt(quantity))) {
    return response.status(UNPROCESABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  return next();
});

module.exports = {
  validation,
};
