const connection = require('../models/connection');

const nameLengthValidator = (nameToValidate) => {
  const minimumNameLength = 5;

  return nameToValidate.length > minimumNameLength;
};

const uniqueNameValidator = (nameToValidate) => {
  const alreadyExists = connection()
    .then((db) => db.collection('products').findOne({ name: { $eq: nameToValidate } }));

  return alreadyExists ? true : false;
};

const quantityValueValidator = (quantityToValidate) => {
  const nullQuantityValue = 0;
  return quantityToValidate > nullQuantityValue;
};

const quantityFormatValidator = (quantityToValidate) => {
  return quantityToValidate.isInteger();
};

module.exports = {
  nameLengthValidator,
  uniqueNameValidator,
  quantityValueValidator,
  quantityFormatValidator,
};
