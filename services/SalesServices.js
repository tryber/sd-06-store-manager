const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const ifIdExists = async (productId) => {
  const couldFind = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(productId) }));
    
  const itExists = couldFind ? true : false;
    
  return itExists;
};

const quantityValueValidator = (quantityToValidate) => {
  const nullQuantityValue = 0;
  return quantityToValidate > nullQuantityValue;
};

const quantityFormatValidator = (quantityToValidate) => {
  return typeof quantityToValidate === 'number';
};

const validateInsertData = async (productId, quantity) => {
  const isValid = 'is valid';

  if (!quantityFormatValidator(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  if (!quantityValueValidator(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const idExists = await ifIdExists(productId);
  if (!idExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product do not exists',
      },
    };
  }
  return isValid;
};

module.exports = {
  validateInsertData,
};
