// const Sales = require('../models/sales');

const ZERO = 0;

const UNPROCESSABLEENTITY = 422;

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

module.exports = {
  quantityValidation
};
