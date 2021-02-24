const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA } = require('../errors/status');

function validateProductData(request, _response, next) {
  const { name, quantity } = request.body;

  const MIN_NAME_LENGTH = 6;
  const nameIsValid = typeof name === 'string' && name.length >= MIN_NAME_LENGTH;

  if (!nameIsValid) {
    const message = '"name" length must be at least 5 characters long';

    const errorInfo = {
      message,
      code: INVALID_DATA,
    };

    throw new AppError(errorInfo, BAD_DATA);
  }

  const quantityIsWholeNumber = Number.isInteger(quantity);

  if (!quantityIsWholeNumber) {
    const message = '"quantity" must be a number';

    const errorInfo = {
      message,
      code: INVALID_DATA,
    };

    throw new AppError(errorInfo, BAD_DATA);
  }

  const MIN_QUANTITY = 1;
  const quantityIsOfValidSize = quantity >= MIN_QUANTITY;

  if (!quantityIsOfValidSize) {
    const message = '"quantity" must be larger than or equal to 1';

    const errorInfo = {
      message,
      code: INVALID_DATA,
    };

    throw new AppError(errorInfo, BAD_DATA);
  }

  return next();
}

module.exports = validateProductData;
