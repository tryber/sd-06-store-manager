const rescue = require('express-rescue');

const INVALID_QUANTITY = 0;

const UNPROCESABLE_ENTITY = 422;

const validation = rescue(async (request, response, next) => {
  const quantity = request.body.map((item) => item.quantity);
  const parse = (obj) => !Number.isInteger(parseInt(obj));

  const invalidQuantity = quantity
    .every((item) => item <= INVALID_QUANTITY);

  const invalidQuantityType = quantity
    .some((item) => parse(item) || typeof item != 'number');

  if (invalidQuantity || invalidQuantityType) {
    return response.status(UNPROCESABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  return next();
});

module.exports = {
  validation,
};
