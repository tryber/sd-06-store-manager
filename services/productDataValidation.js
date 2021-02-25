const Products = require('../models/Products');

const ZERO = 0;
const MIN_LENGTH = 5;

module.exports = async (name, quantity, update) => {

  if(name.length < MIN_LENGTH) throw({ 
    err: {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long'
    }
  });

  if(quantity <= ZERO) throw({
    err: {
      'code': 'invalid_data',
      'message': '"quantity" must be larger than or equal to 1'
    }
  });

  if(typeof quantity !== 'number') throw({
    err: {
      'code': 'invalid_data',
      'message': '"quantity" must be a number'
    }
  });
};