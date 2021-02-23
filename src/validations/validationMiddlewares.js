const rescue = require('express-rescue');
const validate = require('./utils/validations');
const { throwError } = require('../errorHandler/errorHandler');
const {status, errorMessages} = require('../errorHandler/utils/status');

const validateRegisterProduct = rescue((req, _res, next) => {
  const {name, quantity} = req.body;

  const minLength = 5;
  const minValue = 0;

  if(!validate.nameValidation(name, minLength)) {
    console.log('nome muito pequeno');
    throw new throwError(status.unprocessableEntity, errorMessages.smallName);
  };

  if(!validate.quantityTypeValidation(quantity)) {
    throw new throwError(status.unprocessableEntity, errorMessages.quantityAsNumber);
  }

  if(!validate.quantityValidation(quantity, minValue)) {
    throw new throwError(status.unprocessableEntity, errorMessages.lowQuantity);
  }

  next();
});

module.exports = {
  validateRegisterProduct
};
