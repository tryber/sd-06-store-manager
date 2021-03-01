const connection = require('../models/connection');

const nameLengthValidator = (nameToValidate) => {
  const minimumNameLength = 5;

  return nameToValidate.length > minimumNameLength;
};

const uniqueNameValidator = async (nameToValidate) => {
  const couldFind = await connection()
    .then((db) => db.collection('products').findOne({ name: nameToValidate }));
  const alreadyExists = couldFind ? false : true;

  return alreadyExists;
};

const quantityValueValidator = (quantityToValidate) => {
  const nullQuantityValue = 0;
  return quantityToValidate > nullQuantityValue;
};

const quantityFormatValidator = (quantityToValidate) => {
  return typeof quantityToValidate === 'number';
};

const validateInsertData = async (name, quantity) => {
  const isValid = 'is valid';

  if (!nameLengthValidator(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (!quantityFormatValidator(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  if (!quantityValueValidator(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  const isUnique = await uniqueNameValidator(name);
  if (!isUnique) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return isValid;
};

module.exports = {
  validateInsertData,
};
