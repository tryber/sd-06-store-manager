const Yup = require('yup');
const AppError = require('../utils/AppError');

const { INVALID_DATA } = require('../utils/errorCodes');
const { WRONG_DATA } = require('../utils/errorStatus');
const { ValidationError } = require('yup');

const MIN_QUANTITY = 0;

async function validateSale(req, _res, next) {
  const schema = Yup.array().of(
    Yup.object().shape({
      productId: Yup.string().required(),
      quantity: Yup.number().integer()
        .moreThan(MIN_QUANTITY)
        .required()
    }
    ).required());

  try {
    await schema.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors = {
        message: 'Wrong product ID or invalid quantity',
        code: INVALID_DATA,
      };
      throw new AppError(validationErrors, WRONG_DATA);
    }
    return next(error);
  }
};

module.exports = validateSale;

