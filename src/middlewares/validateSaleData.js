const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA } = require('../errors/status');

const baseMessage = 'Wrong product ID or invalid quantity';

function validateProductData(request, _response, next) {
  const saleInfo = request.body;

  const bodyIsArray = Array.isArray(saleInfo);

  if (!bodyIsArray) {
    const message = 'Invalid data provided';

    const errorInfo = {
      message,
      code: INVALID_DATA,
    };

    throw new AppError(errorInfo, BAD_DATA);
  }

  let validData = true;

  saleInfo.forEach(({ quantity }) => {
    const quantityIsWholeNumber = Number.isInteger(quantity);
    const MIN_QUANTITY = 1;
    const quantityIsOfValidSize = quantity >= MIN_QUANTITY;

    const quantityIsValid = quantityIsWholeNumber && quantityIsOfValidSize;

    if (!quantityIsValid) {
      validData = false;
    }
  });

  if (!validData) {
    const errorInfo = {
      message: baseMessage,
      code: INVALID_DATA,
    };

    throw new AppError(errorInfo, BAD_DATA);
  }

  return next();
}

module.exports = validateProductData;
