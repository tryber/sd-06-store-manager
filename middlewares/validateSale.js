const { body, validationResult } = require('express-validator');

const saleValidationRules = () => {
  return [
    body('*.productId')
      .isLength({ min: 5 })
      .withMessage({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }),
    body('*.quantity')
      .isInt()
      .withMessage({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      })
      .isInt({ min: 1 })
      .withMessage({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }),
  ];
};

const UNPROCESSABLE_ENTITY = 422;

const validateSale = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = errors.array().map(err => ({ err: err.msg }));

  if (errors.isEmpty()) return next();

  // I'm getting just the first element in the extractedErrors array only to pass the project's requirement. It would probably be best to return the whole array and treat it differently.
  return res.status(UNPROCESSABLE_ENTITY).json(extractedErrors[0]);
};

module.exports = { saleValidationRules, validateSale };
