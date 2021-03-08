module.exports = {
  invalidName: { 
    code: 'invalid_data', 
    message: '"name" length must be at least 5 characters long',
  },
  quantityIsNotInteger: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
  quantityIsNegative: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1'
  },
  productDuplicated: {
    code: 'invalid_data',
    message: 'Product already exists'
  },
  wrongIdFormat: {
    code: 'invalid_data',
    message: 'Wrong id format'
  }
};