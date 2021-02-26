const { body, validationResult } = require('express-validator');

const productValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 5 })
      .withMessage({
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }),
    body('quantity')
      .isInt()
      .withMessage({
        code: 'invalid_data',
        message: '"quantity" must be a number',
      })
      .isInt({ min: 1 })
      .withMessage({
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }),
  ];
};

const UNPROCESSABLE_ENTITY = 422;

const validateProduct = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = errors.array().map(err => ({ err: err.msg }));

  if (errors.isEmpty()) return next();

  // I'm getting just the first element in the extractedErrors array only to pass the project's requirement. It would probably be best to return the whole array and treat it differently.
  return res.status(UNPROCESSABLE_ENTITY).json(extractedErrors[0]);
};

module.exports = { productValidationRules, validateProduct };
