const Sales = require('../models/sales');
const { ObjectId } = require('mongodb');

const ZERO = 0;

const UNPROCESSABLEENTITY = 422;
const NOTFOUND = 404;

const quantityValidation = async (req, res, next) => {
  const inputedSales = req.body;
  let isValidationOK = true;

  inputedSales.forEach((inputedSale) => {
    if(inputedSale.quantity <= ZERO || typeof inputedSale.quantity === 'string') {
      isValidationOK = false;      
    };
  });

  if(!isValidationOK) {
    return res.status(UNPROCESSABLEENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      } 
    });
  }

  next();
};

const idValidation = async (req, res, next) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)) {
    return res.status(NOTFOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  };

  const idExists = await Sales.findById(id);

  if(!idExists) {
    return res.status(NOTFOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  };

  next();
};

module.exports = {
  quantityValidation,
  idValidation,
};
