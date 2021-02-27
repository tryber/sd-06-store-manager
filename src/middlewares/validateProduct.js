const Yup = require('yup');
const AppError = require('../utils/AppError');

const { INVALID_DATA } = require('../utils/errorCodes');
const { WRONG_DATA } = require('../utils/errorStatus');
const { ValidationError } = require('yup');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 0;

async function validateProduct(req, _res, next) {
  const schema = Yup.object().shape({
    name: Yup.string('"name" must be a string')
      .min(MIN_NAME_LENGTH,
        `"name" length must be at least ${MIN_NAME_LENGTH} characters long`)
      .required('"name" is required'),
    quantity: Yup.number()
      .typeError('"quantity" must be a number')
      .moreThan(MIN_QUANTITY,'"quantity" must be larger than or equal to 1')
      .required('"quantity" is required')
  });

  try {
    await schema.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors = {
        message: error.errors[0],
        code: INVALID_DATA,
      };
      throw new AppError(validationErrors, WRONG_DATA);
    }
    return next(error);
  }
};

module.exports = validateProduct;

